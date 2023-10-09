import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from 'src/app/core/models/interceptors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  username=''
  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>,
  ) {}
  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {      
      if (user) {
       this.username=user.username
      }
    });
  }
  userLogOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
