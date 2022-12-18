import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SocketService, ElectronService } from './services';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule],
  providers: [ElectronService, SocketService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
