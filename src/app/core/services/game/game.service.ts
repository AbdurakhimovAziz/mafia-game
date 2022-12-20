import { Injectable } from '@angular/core';
import { SocketService } from '../socket';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private socket: SocketService) {}

  public socketConnect() {
    this.socket.connect();
  }

  public socketDisconnect() {
    this.socket.disconnect();
  }
}
