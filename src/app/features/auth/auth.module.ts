import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent, RegisterComponent } from './pages';
import { SharedModule } from 'src/app/shared';
import { AuthService } from 'src/app/core';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, SharedModule],
  providers: [AuthService]
})
export class AuthModule {}
