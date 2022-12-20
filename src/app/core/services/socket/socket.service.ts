import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { SOCKET_EVENTS } from '../../constants';
import { ISocketMessage } from '../../models';
import { ElectronService } from '../electron';
import { IPC_MESSAGES } from '../../../../../electron/utils';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private messages: Subject<ISocketMessage<any>> = new Subject();
  private isConnected = false;

  constructor(private electronService: ElectronService) {
    (<any>window).electronAPI?.on(
      IPC_MESSAGES.MESSAGE,
      (_: any, data: string) => {
        this.messages.next({ event: SOCKET_EVENTS.MESSAGE, data });
      }
    );
  }

  connect() {
    if (!this.isConnected) {
      console.log('Connecting to socket');
      (<any>window).socket?.connect();
      this.isConnected = true;
    }
  }

  public send<T>(event: SOCKET_EVENTS, data: T): void {
    (<any>window).socket?.send(JSON.stringify(data));
  }

  public on<T>(event: SOCKET_EVENTS): Observable<T> {
    return this.messages.pipe(
      filter((msg: ISocketMessage<T>) => msg.event === event),
      map((msg: ISocketMessage<T>) => msg.data)
    );
  }
}
