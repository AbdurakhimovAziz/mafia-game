import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../core/services/game/game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.socketConnect();
  }
}
