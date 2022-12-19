import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { SOCKET } from '../../api';
import { IPC_MESSAGES, SOCKET_EVENTS } from '../../constants';
import { ISocketMessage } from '../../models';
import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private messages: Subject<ISocketMessage<any>> = new Subject();
  private isConnected = false;

  constructor(private electronService: ElectronService) {
    (<any>window).electronAPI.on(IPC_MESSAGES.MESSAGE, (_: any, data: string) => {
      this.messages.next({ event: SOCKET_EVENTS.MESSAGE, data });
    });
  }

  connect() {
    if (!this.isConnected) {
      (<any>window).socket.connect(SOCKET);
      this.isConnected = true;
    }
  }

  public send<T>(event: SOCKET_EVENTS, data: T): void {
    (<any>window).electronAPI.send(data);
  }

  public on<T>(event: SOCKET_EVENTS): Observable<T> {
    return this.messages.pipe(
      filter((msg: ISocketMessage<T>) => msg.event === event),
      map((msg: ISocketMessage<T>) => msg.data)
    );
  }
}
