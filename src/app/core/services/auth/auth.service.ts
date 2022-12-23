import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from '../../api';
import { IUser } from '../../models';
import { LobbyService } from '../lobby';
import { UserService } from '../user';
import { LoginRequest, RegisterRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${BASE_URL}`;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private lobbyService: LobbyService,
    private router: Router
  ) {}

  public register(user: RegisterRequest) {
    this.http
      .post(`${this.authUrl}/signup`, {
        email: user.email,
        username: user.username,
        password: user.password
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => console.log(err)
      });
  }

  public login(user: LoginRequest) {
    this.http
      .post<{ message: string; user_info: IUser[] }>(
        `${this.authUrl}/signin`,
        user
      )
      .subscribe({
        next: (res) => {
          console.log(res.user_info);
          this.userService.setUser(res.user_info[0]);
          this.lobbyService.addPlayerToLobby({
            id: res.user_info[0].id,
            username: res.user_info[0].username,
            role: 'mafia',
            isAlive: true
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.log(err)
      });
  }

  public isLoggedIn(): boolean {
    return !!this.userService.getUser();
  }

  public logout(): void {
    this.userService.setUser(null);
    this.router.navigate(['auth/login']);
  }
}
