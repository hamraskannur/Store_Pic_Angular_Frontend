import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminGuard } from 'src/app/core/authentication-guard/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminLoginGuard } from 'src/app/core/authentication-guard/adminLogin.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AdminLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
