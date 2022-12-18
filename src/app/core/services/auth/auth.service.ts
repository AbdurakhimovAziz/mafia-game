import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../api';
import { LoginRequest, RegisterRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${BASE_URL}/auth`;

  constructor(private http: HttpClient) {}

  public register(user: RegisterRequest): void {
    this.http.post(`${this.authUrl}/register`, user).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

  public login(user: LoginRequest): void {
    this.http.post(`${this.authUrl}/login`, user).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }
}
