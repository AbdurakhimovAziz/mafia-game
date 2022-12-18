import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SOCKET } from '../../api';
import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private messages: Subject<string> = new Subject();

  constructor(private electronService: ElectronService) {}

  public sendMsg(msg: string) {
    // this.socket.write(msg);
    (<any>window).electronAPI.send(msg);
  }

  public on(event: string) {
    (<any>window).electronAPI.on(event, (_: any, msg: string) => {
      this.messages.next(msg);
    });

    return this.messages.asObservable();
  }
}
