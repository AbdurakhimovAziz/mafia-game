import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SOCKET_EVENTS } from '../../constants';
import {
  ILobby,
  LobbyCreateDTO,
  LobbyJoinDTO,
  LobbyLeaveDTO,
  Player
} from '../../models';
import { SocketService } from '../socket';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private currentLobby = new BehaviorSubject<ILobby | null>(null);
  public currentLobby$ = this.currentLobby.asObservable();

  constructor(
    private socket: SocketService,
    private userService: UserService
  ) {}

  public fetchLobbies() {
    this.socket.send(SOCKET_EVENTS.LOBBY_LIST);
  }

  public createLobby(lobbyName: string) {
    const { id, username } = this.userService.getUser()!;
    this.socket.send<LobbyCreateDTO>(SOCKET_EVENTS.CREATE_LOBBY, {
      lobbyName,
      id,
      username
    });
  }

  public joinLobby(lobbyId: string) {
    const { id, username } = this.userService.getUser()!;
    this.socket.send<LobbyJoinDTO>(SOCKET_EVENTS.JOIN_LOBBY, {
      lobbyId,
      id,
      username
    });
  }

  public leaveLobby(lobbyId: string) {
    const { id, username } = this.userService.getUser()!;
    this.socket.send<LobbyLeaveDTO>(SOCKET_EVENTS.LEAVE_LOBBY, {
      lobbyId,
      id,
      username
    });
    this.setCurrentLobby(null);
  }

  public addPlayerToLobby(player: Player) {
    const currentLobby = this.getCurrentLobby();
    if (currentLobby) {
      currentLobby.players?.push(player);
      this.setCurrentLobby(currentLobby);
    }
  }

  public removePlayerFromLobby(playerId: string) {
    const currentLobby = this.getCurrentLobby();
    if (currentLobby) {
      currentLobby.players = currentLobby.players?.filter(
        (player) => player.id !== playerId
      );
      this.setCurrentLobby(currentLobby);
    }
  }

  public setCurrentLobby(lobby: ILobby | null) {
    this.currentLobby.next(lobby);
  }

  public getCurrentLobby() {
    return this.currentLobby.value;
  }
}
