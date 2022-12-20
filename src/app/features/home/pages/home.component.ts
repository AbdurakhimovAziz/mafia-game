import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {SOCKET_EVENTS, SocketService} from 'src/app/core';

// import { ElectronService, SocketService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public messages = new BehaviorSubject<string[]>([]);

  public messageGr = new FormGroup({
    message: new FormControl('')
  });

  constructor(private socketService: SocketService, private zone: NgZone) {}

  get message() {
    return this.messageGr.get('message');
  }

  ngOnInit(): void {
    this.socketService.on<string>(SOCKET_EVENTS.MESSAGE).subscribe((msg) => {
      console.log('Message from main process: ', msg);
      this.zone.run(() => {
        this.messages.next([...this.messages.value, msg]);
      });
    });
  }

  public connect() {
    this.socketService.connect();
  }

  public sendMsg() {
    console.log('Sending message to main process: ', this.messageGr.value);
    // this.messages.next([
    //   ...this.messages.value,
    //   this.messageGr.value.message || ''
    // ]);
    this.socketService.send(SOCKET_EVENTS.MESSAGE, this.messageGr.value);
    this.messageGr.reset();
  }
}
