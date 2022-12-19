import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent, RegisterComponent } from './pages';
import { SharedModule } from 'src/app/shared';
import { MatIconModule } from '@angular/material/icon';
import { InputErrorComponent } from './components/input-error/input-error.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, InputErrorComponent],
  imports: [AuthRoutingModule, SharedModule, MatIconModule],
  providers: []
})
export class AuthModule {}
