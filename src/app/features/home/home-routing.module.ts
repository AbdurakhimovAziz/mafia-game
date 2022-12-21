import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'play',
    loadChildren: () =>
      import('../lobby/lobby.module').then((m) => m.LobbyModule)
  },
  {
    path: 'game',
    loadChildren: () => import('../game/game.module').then((m) => m.GameModule)
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
