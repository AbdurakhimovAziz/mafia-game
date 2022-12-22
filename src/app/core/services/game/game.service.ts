import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { GAME_STATUS } from '../../constants';
import { Player } from '../../models';
import { GamePhases } from '../../utils';
import { LobbyService } from '../lobby/lobby.service';
import { SocketService } from '../socket';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameStatus: GAME_STATUS = GAME_STATUS.WAITING;
  private gamePhase = new BehaviorSubject<GamePhases>('day');
  public gamePhase$ = this.gamePhase.asObservable();
  private isDiscussionPhaseSubject = new BehaviorSubject<boolean>(false);
  public isDiscussionPhase$ = this.isDiscussionPhaseSubject.asObservable();

  private player: Player | null = {
    id: '123',
    username: 'test',
    role: 'doctor',
    isAlive: true
  };

  constructor(
    private socket: SocketService,
    private lobbyService: LobbyService
  ) {
    this.gamePhase$.subscribe((phase) => {
      if (phase === 'day') {
        this.isDiscussionPhaseSubject.next(true);
        timer(10000).subscribe(() => {
          this.isDiscussionPhaseSubject.next(false);
          this.setGamePhase('night');
        });
      }

      if (phase === 'night') {
        timer(10000).subscribe(() => {
          this.setGamePhase('day');
        });
      }
    });
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

  public isAlive(): boolean {
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
}
