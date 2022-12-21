import { Component } from '@angular/core';
import { AuthService, UserService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private userService: UserService, private auth: AuthService) {}

  public get username(): string {
    return this.userService.getUser()?.username || '';
  }

  public logout(): void {
    this.auth.logout();
  }
}
