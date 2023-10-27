import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNotfoundComponent } from './features/error/components/app-notfound/app-notfound.component';
import { AppBadgatewayComponent } from './features/error/components/app-badgateway/app-badgateway.component';
import { AppInternalserverComponent } from './features/error/components/app-internalserver/app-internalserver.component';
import { CommonerrorComponent } from './features/error/components/commonerror/commonerror.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: '404', component: AppNotfoundComponent },
  { path: '502', component: AppBadgatewayComponent },
  { path: '500', component: AppInternalserverComponent },
  { path: 'error', component: CommonerrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
