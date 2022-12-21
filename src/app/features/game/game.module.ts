import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './pages/game/game.component';

@NgModule({
  declarations: [GameComponent],
  imports: [GameRoutingModule, SharedModule]
})
export class GameModule {}
