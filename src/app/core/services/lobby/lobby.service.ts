import { Injectable } from '@angular/core';
import { SOCKET_EVENTS } from '../../constants';
import { LobbyCreateDTO, LobbyJoinDTO, LobbyLeaveDTO } from '../../models';
import { SocketService } from '../socket';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
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
  }
}
