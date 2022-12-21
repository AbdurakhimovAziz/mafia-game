import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from '../../api';
import { IUser } from '../../models';
import { UserService } from '../user';
import { LoginRequest, RegisterRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${BASE_URL}/auth`;

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
    private router: Router
  ) {}

  public register(user: RegisterRequest): void {
    // this.http.post(`${this.authUrl}/register`, user).subscribe({
    //   next: (res) => console.log(res),
    //   error: (err) => console.log(err)
    // });

    this.mockUsers.push({
      id: `${this.mockUsers.length + 1}`,
      ...user
    });
  }

  public login(user: LoginRequest): void {
    // this.http.post(`${this.authUrl}/login`, user).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => console.log(err)
    // });

    this.mockUsers.forEach((mockUser) => {
      if (
        mockUser.username === user.username &&
        mockUser.password === user.password
      ) {
        console.log('User found');
        this.userService.setUser(mockUser);
        this.router.navigate(['/']);
      }
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
