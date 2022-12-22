import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameMessage } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<GameMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  public addMessage(message: GameMessage): void {
    this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
  }

  public clearMessages(): void {
    this.messagesSubject.next([]);
  }

  public getMessages(): void {
    this.messagesSubject.getValue();
  }
}
