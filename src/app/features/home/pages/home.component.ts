import { Component } from '@angular/core';
import { ElectronService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private electronService: ElectronService) {}

  public sendMsg(msg: string) {}
}
