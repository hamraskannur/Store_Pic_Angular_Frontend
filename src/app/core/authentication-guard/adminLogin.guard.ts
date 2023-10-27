import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  constructor( private router: Router) { }
  canActivate() {
    const isLoggedIn =localStorage.getItem("adminToken")
    if (isLoggedIn) {      
      return this.router.navigate(['/admin']);
    } else {
      return true;
    }
  }

}
