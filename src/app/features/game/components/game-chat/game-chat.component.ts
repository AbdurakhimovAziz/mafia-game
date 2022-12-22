import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  GameMessage,
  GameMessageDTO,
  GameMessageResponse,
  SOCKET_EVENTS,
  SocketService,
  UserService
} from '../../../../core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { GamePhases, SubscriptionDestroyer } from '../../../../core/utils';

@Component({
  selector: 'app-game-chat',
  templateUrl: './game-chat.component.html',
  styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent
  extends SubscriptionDestroyer
  implements OnInit, AfterViewChecked
{
  @Input() public gamePhase!: GamePhases;
  public messageForm = new FormGroup({
    message: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    })
  });
  @ViewChild('scroll') private scrollContainer!: ElementRef;
  private messagesSubject = new BehaviorSubject<GameMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(
    private socket: SocketService,
    private zone: NgZone,
    private lobbyService: LobbyService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.socket
        .on<GameMessageResponse>(SOCKET_EVENTS.GAME_MESSAGE)
        .subscribe((response) => {
          this.zone.run(() => {
            const data = response.data;
            data &&
              this.messagesSubject.next([
                ...this.messagesSubject.getValue(),
                {
                  message: data.message,
                  username: data.username
                }
              ]);

            console.log('game message', response);
          });
        })
    );
  }

  public sendMessage(): void {
    if (!this.messageForm.valid) return;

    const messageFormValue = this.messageForm.getRawValue();
    const user = this.userService.getUser()!;
    const lobbyId = this.lobbyService.getCurrentLobby()?.id!;
    const message: GameMessageDTO = {
      ...messageFormValue,
      username: user.username,
      id: user.id,
      lobbyId
    };
    this.socket.send<GameMessageDTO>(SOCKET_EVENTS.GAME_MESSAGE, message);
    this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
    this.messageForm.reset();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  public getMessages(): void {
    this.messagesSubject.getValue();
  }
}
