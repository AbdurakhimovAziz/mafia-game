import {Component, NgZone, OnInit} from '@angular/core';
import {SocketService} from 'src/app/core';

// import { ElectronService, SocketService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private socketService: SocketService, private zone: NgZone) {}

  ngOnInit(): void {}
}
