import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILobby,
  LobbyService,
  SOCKET_EVENTS,
  SocketService,
  SubscriptionDestroyer
} from '../../../../core';
import { mockLobby } from '../../utils';

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss']
})
export class LobbyJoinComponent
  extends SubscriptionDestroyer
  implements OnInit, OnDestroy
{
  public lobbies: ILobby[] = [mockLobby, mockLobby, mockLobby];

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
    this.fetchLobbies();
  }

  public fetchLobbies(): void {
    this.lobbyService.fetchLobbies();
  }

  public joinLobby(lobbyId: string): void {
    this.router.navigate(['play', lobbyId]);
  }
}
