import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILobby, SOCKET_EVENTS, SocketService } from '../../../../core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss']
})
export class LobbyJoinComponent implements OnInit, OnDestroy {
  public lobbies: ILobby[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private socket: SocketService,
    private lobbyService: LobbyService,
    private zone: NgZone
  ) {}

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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public joinLobby(lobbyId: string): void {
    this.lobbyService.joinLobby(lobbyId);
  }

  private addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }
}
