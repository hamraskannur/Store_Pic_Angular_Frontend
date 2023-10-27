import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginGuard } from 'src/app/core/authentication-guard/userLogin.guard';
import { UserGuard } from 'src/app/core/authentication-guard/user.guard';
import { OneImageComponent } from './components/one-image/one-image.component';
import { ApiComponent } from './components/api/api.component';
import { GuestUserComponent } from './components/guest-user/guest-user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GuestUserComponent,
    canActivate: [UserLoginGuard]
  },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'oneImage/:id', component: OneImageComponent },
  { path: 'api', component: ApiComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UserLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UserLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
