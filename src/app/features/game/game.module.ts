import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './pages/game/game.component';
import { GameChatComponent } from './components/game-chat/game-chat.component';

@NgModule({
  declarations: [GameComponent, GameChatComponent],
  imports: [GameRoutingModule, SharedModule]
})
export class GameModule {}
