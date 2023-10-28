import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class AdminNavBarComponent {
constructor( private router: Router){}


  userLogOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
