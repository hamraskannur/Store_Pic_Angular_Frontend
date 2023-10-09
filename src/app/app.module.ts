import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserStateModule } from './stores/state.module';
import { TokenIntercepterService } from './core/interceptors/token-intercepter.service';
import { ErrorHandlingInterceptor } from './core/interceptors/errorHandintercepter.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UserStateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
