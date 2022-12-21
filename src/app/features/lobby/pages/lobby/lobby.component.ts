import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ILobby,
  LobbyJoinResponse,
  SOCKET_EVENTS,
  SocketService,
  UserService
} from '../../../../core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { SubscriptionDestroyer } from '../../../../core/utils';

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
  public mockLobby: ILobby = {
    id: '123',
    name: 'lobby name',
    players: [
      {
        id: '123',
        username: 'test'
      },
      {
        id: '123',
        username: 'example'
      }
    ],
    host: 'example',
    playersCount: 1
  };
  private lobbyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private lobbyService: LobbyService,
    private socket: SocketService,
    private userService: UserService,
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
    this.lobbyId &&
      !this.lobbyService.getCurrentLobby() &&
      this.lobbyService.joinLobby(this.lobbyId);

    this.lobbyService.setCurrentLobby(this.mockLobby); // TODO: remove
  }

  public isHost(username: string): boolean {
    return username === this.userService.getUser()?.username;
  }

  public startGame() {
    //TODO: start game
  }

  override ngOnDestroy(): void {
    this.unsubscribeAll();
    this.lobbyId && this.lobbyService.leaveLobby(this.lobbyId);
  }
}
