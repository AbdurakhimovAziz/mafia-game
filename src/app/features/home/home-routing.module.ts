import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { LobbyCreateComponent } from './pages/lobby-create/lobby-create.component';
import { LobbyJoinComponent } from './pages/lobby-join/lobby-join.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'play',
    children: [
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
    ]
  },
  {
    path: 'roles',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
