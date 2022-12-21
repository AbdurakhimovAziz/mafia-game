import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyCreateComponent } from './pages/lobby-create/lobby-create.component';
import { LobbyJoinComponent } from './pages/lobby-join/lobby-join.component';
import { PlayComponent } from './pages/play/play.component';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent
  },
  {
    path: 'create-lobby',
    component: LobbyCreateComponent
  },
  {
    path: 'join-lobby',
    component: LobbyJoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {}
