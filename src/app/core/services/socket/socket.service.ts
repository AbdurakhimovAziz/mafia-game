import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { SOCKET_EVENTS } from '../../constants';
import { ISocketMessage } from '../../models';
import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private messages: Subject<ISocketMessage<any>> = new Subject();
  private isConnected = false;
  private nodeWindow = <any>window;

  constructor(private electronService: ElectronService) {}

  public connect() {
    if (!this.isConnected) {
      console.log('Connecting to socket');
      this.nodeWindow.socket?.connect();
      this.isConnected = true;

      this.nodeWindow.socket?.handleSocketData((e, data) => {
        this.messages.next(JSON.parse(data));
      });

      this.nodeWindow.socket?.handleSocketError((e, data) =>
        console.log('Socket error', data)
      );
    }
  }

  public send<T>(event: SOCKET_EVENTS, data?: T): void {
    console.log('Sending socket message', event, data);
    const msg: ISocketMessage<T> = {
      event,
      data
    };
    this.nodeWindow.socket?.send(JSON.stringify(msg));
  }

  public on<T>(event: SOCKET_EVENTS): Observable<ISocketMessage<T>> {
    return this.messages.pipe(
      filter((msg: ISocketMessage<T>) => msg.event === event)
    );
  }

  public disconnect() {
    if (this.isConnected) {
      console.log('Disconnecting from socket');
      this.nodeWindow.socket?.disconnect();
      this.isConnected = false;
    }
  }

  public reconnect() {
    this.disconnect();
    this.connect();
  }
}
