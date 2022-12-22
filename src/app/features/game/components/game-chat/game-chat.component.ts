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
import {
  GameMessage,
  GameMessageDTO,
  GameMessageResponse,
  MessageService,
  SOCKET_EVENTS,
  SocketService,
  UserService
} from '../../../../core';
import { GameService } from '../../../../core/services/game/game.service';
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
  public messages$ = this.messageService.messages$;
  @ViewChild('scroll') private scrollContainer!: ElementRef;

  constructor(
    private socket: SocketService,
    private zone: NgZone,
    private lobbyService: LobbyService,
    private gameService: GameService,
    private userService: UserService,
    private messageService: MessageService
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
            const message: GameMessage = {
              message: data?.message || '',
              username: data?.username
            };
            this.messageService.addMessage(message);

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
      lobbyId,
      isPrivate: this.gameService.isNightPhase()
    };

    this.socket.send<GameMessageDTO>(SOCKET_EVENTS.GAME_MESSAGE, message);
    this.messageService.addMessage(message);
    this.messageForm.reset();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public cantWrite(): boolean {
    return (
      this.gameService.isNightPhase() &&
      !(this.gameService.getRole() === 'mafia')
    );
  }

  private scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
