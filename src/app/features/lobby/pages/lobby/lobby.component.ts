import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GameStartResponse,
  LobbyJoinedResponse,
  LobbyJoinResponse,
  LobbyLeftResponse,
  SOCKET_EVENTS,
  SocketService,
  StartGameDTO,
  UserService
} from '../../../../core';
import { GameService } from '../../../../core/services/game/game.service';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { SubscriptionDestroyer } from '../../../../core/utils';
import { mockLobby } from '../../utils';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent
  extends SubscriptionDestroyer
  implements OnInit, OnDestroy
{
  public lobby$ = this.lobbyService.currentLobby$;
  private lobbyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lobbyService: LobbyService,
    private socket: SocketService,
    private userService: UserService,
    private gameService: GameService,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    this.lobbyId = this.route.snapshot.paramMap.get('lobbyId');

    this.addSubscription(
      this.socket
        .on<LobbyJoinResponse>(SOCKET_EVENTS.JOIN_LOBBY)
        .subscribe((response) => {
          this.zone.run(() => {
            response.data && this.lobbyService.setCurrentLobby(response.data);
          });
        })
    );

    this.addSubscription(
      this.socket
        .on<LobbyJoinedResponse>(SOCKET_EVENTS.JOINED_LOBBY)
        .subscribe((response) => {
          this.zone.run(() => {
            response.data && this.lobbyService.addPlayerToLobby(response.data!);
          });
        })
    );

    this.addSubscription(
      this.socket
        .on<LobbyLeftResponse>(SOCKET_EVENTS.JOINED_LOBBY)
        .subscribe((response) => {
          this.zone.run(() => {
            response.data &&
              this.lobbyService.removePlayerFromLobby(response.data.id!);
          });
        })
    );

    this.addSubscription(
      this.socket
        .on<GameStartResponse>(SOCKET_EVENTS.GAME_START)
        .subscribe((response) => {
          this.zone.run(() => {
            const user = this.userService.getUser();
            if (user && response.data) {
              this.gameService.setPlayer({
                id: user.id,
                username: user.username,
                ...response.data,
                isAlive: true
              });
              this.router.navigate(['game']);
            }
          });
        })
    );

    this.lobbyId &&
      !this.lobbyService.getCurrentLobby() &&
      this.lobbyService.joinLobby(this.lobbyId);

    !this.lobbyService.getCurrentLobby() &&
      this.lobbyService.setCurrentLobby(mockLobby); // TODO: remove
  }

  public isHost(username: string): boolean {
    return username === this.userService.getUser()?.username;
  }

  public startGame() {
    this.socket.send<StartGameDTO>(SOCKET_EVENTS.GAME_START, {
      lobbyId: this.lobbyId!
    });
    // TODO: remove
    this.router.navigate(['game']);
  }

  public leaveLobby() {
    this.lobbyId && this.lobbyService.leaveLobby(this.lobbyId!);
  }

  override ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
