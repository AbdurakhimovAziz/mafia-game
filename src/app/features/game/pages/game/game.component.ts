import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GAME_ACTIONS,
  GAME_ROLE_NAMES,
  GameActionDTO,
  GameService,
  LobbyService,
  MessageService,
  Player,
  SOCKET_EVENTS,
  SocketService,
  SubscriptionDestroyer,
  VoteDTO,
  VoteResponse,
  VoteResultResponse
} from '../../../../core';
import { mockLobby } from '../../../lobby/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends SubscriptionDestroyer implements OnInit {
  public currentLobby$ = this.lobbyService.currentLobby$;
  public gamePhase$ = this.gameService.gamePhase$;

  constructor(
    private gameService: GameService,
    private lobbyService: LobbyService,
    private messageService: MessageService,
    private socket: SocketService,
    private router: Router,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    this.gameService.startGame();

    this.addSubscription(
      this.socket.on<VoteResponse>(SOCKET_EVENTS.GAME_VOTE).subscribe((res) => {
        const data = res.data;
        data &&
          this.zone.run(() => {
            this.messageService.addMessage({
              message: `${data.username} voted for ${data.player}`
            });
          });
      })
    );

    this.addSubscription(
      this.socket
        .on<VoteResultResponse>(SOCKET_EVENTS.GAME_VOTE)
        .subscribe((res) => {
          const data = res.data;
          data &&
            this.zone.run(() => {
              this.messageService.addMessage({
                message: `${data.username} was voted out. Player was a ${data.role}`
              });

              this.lobbyService.revealRole(data.username, data.role);
            });
        })
    );

    // TODO: remove
    this.lobbyService.setCurrentLobby(mockLobby);
    console.log(this.lobbyService.getCurrentLobby());
    // this.gameService.revealAllyRoles();
  }

  public vote(username: string): void {
    const currentPlayer = this.getPlayer();
    currentPlayer &&
      this.socket.send<VoteDTO>(SOCKET_EVENTS.GAME_VOTE, {
        player: username,
        id: currentPlayer.id,
        username: currentPlayer.username,
        lobbyId: this.getLobbyId()
      });

    // TODO: remove
    this.messageService.addMessage({
      message: `${currentPlayer?.username} voted for ${username}`
    });
  }

  public kill(username: string): void {
    const currentPlayer = this.getPlayer();
    currentPlayer &&
      this.socket.send<GameActionDTO>(SOCKET_EVENTS.GAME_ACTION, {
        player: username,
        id: currentPlayer.id,
        username: currentPlayer.username,
        lobbyId: this.getLobbyId(),
        action: GAME_ACTIONS.KILL
      });
  }

  public check(username: string): void {
    const currentPlayer = this.getPlayer();
    currentPlayer &&
      this.socket.send<GameActionDTO>(SOCKET_EVENTS.GAME_ACTION, {
        player: username,
        id: currentPlayer.id,
        username: currentPlayer.username,
        lobbyId: this.getLobbyId(),
        action: GAME_ACTIONS.CHECK
      });
  }

  public heal(username: string): void {
    const currentPlayer = this.getPlayer();
    this.isMe(username) && this.gameService.healMyself();
    currentPlayer &&
      this.socket.send<GameActionDTO>(SOCKET_EVENTS.GAME_ACTION, {
        player: username,
        id: currentPlayer.id,
        username: currentPlayer.username,
        lobbyId: this.getLobbyId(),
        action: GAME_ACTIONS.HEAL
      });
  }

  public isDayPhase(): boolean {
    return this.gameService.isDayPhase();
  }

  public isNightPhase(): boolean {
    return this.gameService.isNightPhase();
  }

  public canKill(username: string): boolean {
    const role = this.getRole();
    return (
      !this.isMe(username) &&
      !this.gameService.isAlly(username) &&
      this.isNightPhase() &&
      (role === GAME_ROLE_NAMES.MAFIA ||
        role === GAME_ROLE_NAMES.DETECTIVE ||
        role === GAME_ROLE_NAMES.DON)
    );
  }

  public canHeal(username: string): boolean {
    return (
      (this.isNightPhase() &&
        this.isMe(username) &&
        this.getRole() === 'doctor' &&
        !this.gameService.isHealedMyself()) ||
      (this.isNightPhase() && this.getRole() === 'doctor')
    );
  }

  public canCheck(username: string): boolean {
    return (
      !this.isMe(username) &&
      this.isNightPhase() &&
      this.getRole() === 'detective'
    );
  }

  public canVote(username: string): boolean {
    return !this.isMe(username) && this.isDayPhase();
  }

  public isAlly(username: string): boolean {
    return this.gameService.isAlly(username);
  }

  public isMe(username: string): boolean {
    return this.getPlayer()?.username === username;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public leaveLobby(lobbyId: string): void {
    this.lobbyService.leaveLobby(lobbyId);
    this.router.navigate(['/']);
  }

  public getLobbyId(): string {
    return this.lobbyService.getCurrentLobby()?.id || '';
  }

  public getPlayer(): Player | null {
    return this.gameService.getPlayer();
  }

  public getRole(): string {
    return this.gameService.getPlayer()?.role || '';
  }

  public amIAlive(): boolean {
    return this.gameService.amIAlive();
  }
}
