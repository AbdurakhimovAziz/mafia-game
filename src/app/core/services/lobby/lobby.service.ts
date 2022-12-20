import { Injectable } from '@angular/core';
import { SocketService } from '../socket';
import { SOCKET_EVENTS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private socket: SocketService) {}

  public fetchLobbies() {
    this.socket.send(SOCKET_EVENTS.LOBBY_LIST);
  }

  public createLobby() {
    this.socket.send(SOCKET_EVENTS.CREATE_LOBBY);
  }

  public joinLobby(lobbyId: string) {
    this.socket.send(SOCKET_EVENTS.JOIN_LOBBY, lobbyId);
  }

  public leaveLobby(lobbyId: string) {
    this.socket.send(SOCKET_EVENTS.LEAVE_LOBBY, lobbyId);
  }
}
