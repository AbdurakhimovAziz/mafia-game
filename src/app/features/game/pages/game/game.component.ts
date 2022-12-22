import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../../core';
import { GameService } from '../../../../core/services/game/game.service';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { SubscriptionDestroyer } from '../../../../core/utils';
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
    private socket: SocketService
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: remove
    this.lobbyService.setCurrentLobby(mockLobby);
  }

  public isDayPhase(): boolean {
    return this.gameService.isDayPhase();
  }

  public isNightPhase(): boolean {
    return this.gameService.isNightPhase();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
