import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth.routing.module'
import { LoginComponent, RegisterComponent } from './pages'
import { SharedModule } from 'src/app/shared'

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
