import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyCreateComponent } from './pages/lobby-create/lobby-create.component';
import { LobbyJoinComponent } from './pages/lobby-join/lobby-join.component';
import { PlayComponent } from './pages/play/play.component';
import { LobbyComponent } from './pages/lobby/lobby.component';

@NgModule({
  declarations: [PlayComponent, LobbyCreateComponent, LobbyJoinComponent, LobbyComponent],
  imports: [CommonModule, LobbyRoutingModule, SharedModule]
})
export class LobbyModule {}
