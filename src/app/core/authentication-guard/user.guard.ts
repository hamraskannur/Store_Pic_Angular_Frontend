import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor( private router: Router) { }
  canActivate() {
    const isLoggedIn =localStorage.getItem("token")
    if (isLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }

}
