import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginGuard } from 'src/app/core/authentication-guard/userLogin.guard';
import { UserGuard } from 'src/app/core/authentication-guard/user.guard';
import { OneImageComponent } from './components/one-image/one-image.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [UserLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UserLoginGuard] },
  { path: 'oneImage/:id', component: OneImageComponent},
  { path: '404', component: HomeComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
