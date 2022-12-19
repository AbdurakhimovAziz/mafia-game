import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public user$: Observable<IUser | null> = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    this.userSubject.next(user ? JSON.parse(user) : null);
  }

  public setUser(user: IUser | null): void {
    user && localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): IUser | null {
    return this.userSubject.value;
  }

  public getId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }
}
