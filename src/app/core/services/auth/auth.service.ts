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

  // TODO: remove mock
  private mockUsers: IUser[] = [
    {
      id: '1',
      email: 'example@mail.com',
      username: 'example',
      password: '12345678'
    },
    {
      id: '2',
      email: 'example2@mail.com',
      username: 'example2',
      password: '12345678'
    },
    {
      id: '3',
      email: 'example3@mail.com',
      username: 'example3',
      password: '12345678'
    }
  ];

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
    // this.mockUsers.push({
    //   id: `${this.mockUsers.length + 1}`,
    //   ...user
    // });
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

    // this.mockUsers.forEach((mockUser) => {
    //   if (
    //     mockUser.username === user.username &&
    //     mockUser.password === user.password
    //   ) {
    //     console.log('User found');
    //     this.userService.setUser(mockUser);
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  public isLoggedIn(): boolean {
    return !!this.userService.getUser();
  }

  public logout(): void {
    this.userService.setUser(null);
    this.router.navigate(['auth/login']);
  }
}
