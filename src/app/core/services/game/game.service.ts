import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private gamePhase = new BehaviorSubject<GamePhases>('night');
  public gamePhase$ = this.gamePhase.asObservable();
  private player: Player | null = {
    id: '123',
    username: 'test',
    role: 'mafia'
  };

  constructor(
    private socket: SocketService,
    private lobbyService: LobbyService
  ) {
    console.log('game service');
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

  public socketConnect() {
    this.socket.connect();
  }

  public socketDisconnect() {
    this.socket.disconnect();
  }
}
