import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStateModule } from './stores/state.module';
import { TokenIntercepterService } from './core/interceptors/token-intercepter.service';
import { ErrorHandlingInterceptor } from './core/interceptors/errorHandintercepter.service';
import { AppNotfoundComponent } from './features/error/components/app-notfound/app-notfound.component';
import { AppInternalserverComponent } from './features/error/components/app-internalserver/app-internalserver.component';
import { AppBadgatewayComponent } from './features/error/components/app-badgateway/app-badgateway.component';
import { CommonerrorComponent } from './features/error/components/commonerror/commonerror.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNotfoundComponent,
    AppInternalserverComponent,
    AppBadgatewayComponent,
    CommonerrorComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UserStateModule,BrowserAnimationsModule,ToastrModule.forRoot()],
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
