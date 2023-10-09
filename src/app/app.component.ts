import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './stores/user/user.reducer';
import { loadUserData } from './stores/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(
    private store: Store<{ user: UserState }>,
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.store.dispatch(loadUserData());
    }
  }
}
