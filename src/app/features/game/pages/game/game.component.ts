import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GAME_ACTIONS,
  GameActionDTO,
  Player,
  SOCKET_EVENTS,
  SocketService,
  VoteDTO
} from '../../../../core';
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
    private socket: SocketService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: remove
    this.lobbyService.setCurrentLobby(mockLobby);
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

  public canKill(): boolean {
    const player = this.gameService.getPlayer();
    return (
      this.isNightPhase() &&
      this.gameService.isAlive() &&
      (player?.role === 'mafia' ||
        player?.role === 'detective' ||
        player?.role === 'don')
    );
  }

  public canHeal(): boolean {
    return (
      this.isNightPhase() &&
      this.gameService.isAlive() &&
      this.gameService.getPlayer()?.role === 'doctor'
    );
  }

  public canCheck(): boolean {
    return (
      this.isNightPhase() &&
      this.gameService.isAlive() &&
      this.gameService.getPlayer()?.role === 'detective'
    );
  }

  public canVote(): boolean {
    return this.isDayPhase() && this.gameService.isAlive();
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
}
