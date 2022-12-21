import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RolesComponent } from './pages/roles/roles.component';

@NgModule({
  declarations: [HomeComponent, RolesComponent],
  imports: [HomeRoutingModule, SharedModule]
})
export class HomeModule {}
