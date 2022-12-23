import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { GAME_STATUS, PhaseTimes, SOCKET_EVENTS } from '../../constants';
import { ILobby, Player } from '../../models';
import { GamePhases, PlayerRoles } from '../../utils';
import { LobbyService } from '../lobby';
import { SocketService } from '../socket';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameStatus: GAME_STATUS = GAME_STATUS.WAITING;
  private gamePhase = new BehaviorSubject<GamePhases>('day');
  public gamePhase$ = this.gamePhase.asObservable();
  private healedMyself = false;
  private isDiscussionPhaseSubject = new BehaviorSubject<boolean>(false);
  public isDiscussionPhase$ = this.isDiscussionPhaseSubject.asObservable();

  private player: Player | null = {
    id: '123',
    username: 'example',
    role: 'mafia',
    isAlive: true
  };

  constructor(
    private socket: SocketService,
    private lobbyService: LobbyService
  ) {
    this.gamePhase$.subscribe((phase) => {
      if (phase === 'day') {
        this.isDiscussionPhaseSubject.next(true);

        timer(PhaseTimes.DISCUSSION).subscribe(() => {
          this.isDiscussionPhaseSubject.next(false);

          timer(PhaseTimes.VOTING).subscribe(() => {
            this.setGamePhase('night');

            this.amIHost() &&
              this.socket.send<string>(
                SOCKET_EVENTS.GAME_VOTE_RESULT,
                this.getLobbyId()
              );
          });
        });
      }

      if (phase === 'night') {
        timer(PhaseTimes.NIGHT).subscribe(() => {
          this.setGamePhase('day');
          this.isDiscussionPhaseSubject.next(true);

          this.amIHost() &&
            this.socket.send<string>(
              SOCKET_EVENTS.GAME_ACTION_RESULT,
              this.getLobbyId()
            );
        });
      }
    });
  }

  public amIHost(): boolean {
    return this.getLobby()?.host === this.player?.username;
  }

  public startGame() {
    this.gameStatus = GAME_STATUS.STARTED;
  }

  public setPlayer(player: Player) {
    this.player = player;
  }

  public getPlayer() {
    return this.player;
  }

  public setGamePhase(phase: GamePhases) {
    this.gamePhase.next(phase);
  }

  public socketConnect() {
    this.socket.connect();
  }

  public amIAlive(): boolean {
    console.log(this.player?.isAlive);
    return this.player?.isAlive || false;
  }

  public socketDisconnect() {
    this.socket.disconnect();
  }

  public isDayPhase(): boolean {
    return this.gamePhase.getValue() === 'day';
  }

  public isNightPhase(): boolean {
    return this.gamePhase.getValue() === 'night';
  }

  public getRole(): PlayerRoles {
    return this.player?.role || 'townie';
  }

  public getLobby(): ILobby | null {
    return this.lobbyService.getCurrentLobby();
  }

  public getLobbyId(): string {
    return this.getLobby()?.id || '';
  }

  public healMyself() {
    this.healedMyself = true;
  }

  public isHealedMyself() {
    return this.healedMyself;
  }
}
