import { Component } from '@angular/core';
import { AuthService, SocketService, UserService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private socket: SocketService
  ) {}

  public get username(): string {
    return this.userService.getUser()?.username || '';
  }

  public logout(): void {
    this.auth.logout();
  }

  public reconnect(): void {
    this, this.socket.reconnect();
  }
}
