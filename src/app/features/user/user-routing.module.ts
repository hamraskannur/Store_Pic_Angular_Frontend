import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginGuard } from 'src/app/core/authentication-guard/userLogin.guard';
import { UserGuard } from 'src/app/core/authentication-guard/user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [UserLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UserLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
