import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { LobbyCreateComponent } from './pages/lobby-create/lobby-create.component';
import { LobbyJoinComponent } from './pages/lobby-join/lobby-join.component';
import { RolesComponent } from './pages/roles/roles.component';

@NgModule({
  declarations: [HomeComponent, PlayComponent, LobbyCreateComponent, LobbyJoinComponent, RolesComponent],
  imports: [HomeRoutingModule, SharedModule]
})
export class HomeModule {}
