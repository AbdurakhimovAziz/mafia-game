import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILobby, SOCKET_EVENTS, SocketService } from '../../../../core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { SubscriptionDestroyer } from '../../../../core/utils';

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss']
})
export class LobbyJoinComponent
  extends SubscriptionDestroyer
  implements OnInit, OnDestroy
{
  public lobbies: ILobby[] = [];

  constructor(
    private socket: SocketService,
    private lobbyService: LobbyService,
    private zone: NgZone,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: type lobby
    this.addSubscription(
      this.socket.on<ILobby[]>(SOCKET_EVENTS.LOBBY_LIST).subscribe((msg) => {
        console.log('lobby list', msg);
        this.zone.run(() => {
          this.lobbies = msg.data || [];
        });
      })
    );
    this.lobbyService.fetchLobbies();
  }

  public joinLobby(lobbyId: string): void {
    // this.lobbyService.joinLobby(lobbyId);
    this.router.navigate(['lobby', lobbyId]);
  }
}
