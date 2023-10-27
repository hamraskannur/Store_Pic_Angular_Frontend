import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from 'src/app/core/components/user/nav-bar/nav-bar.component';
import { UploadImageComponent } from './components/home/upload-image/upload-image.component';
import { OneImageComponent } from './components/one-image/one-image.component';
import { ConfirmationPopupComponent } from './components/one-image/confirmation-popup/confirmation-popup.component';
import { ApiComponent } from './components/api/api.component';
import { GuestUserComponent } from './components/guest-user/guest-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    UploadImageComponent,
    OneImageComponent,
    ConfirmationPopupComponent,
    ApiComponent,
    GuestUserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
