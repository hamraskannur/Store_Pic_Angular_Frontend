import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from 'src/app/core/components/user/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
