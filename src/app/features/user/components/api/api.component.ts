import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/core/models/interceptors';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/stores/user/user.reducer';
import { updateOptions } from 'src/app/stores/user/user.actions';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
})
export class ApiComponent implements OnInit {
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);
  key: string | null = null
  loding = false;
 

  
  formattedJSON: string;

  constructor(
    private ApiService: ApiService,
    private store: Store<{ user: UserState }>
  ) {
    this.formattedJSON = JSON.stringify(
      {
        data: {
          id: '2ndCYJK',
          url: 'https://i.ibb.co/w04Prt6/c1f64245afb2.gif',
          display_url: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif',
          expiration: '0',
          delete_url: 'https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c'
        },
        success: true,
        status: 200
      },
      null,
      2 // The number of spaces to use for indentation
    );
      }


  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.key = user.key;
      }
    });
  }

  copyToClipboard(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
  }

  restKey() {
    this.loding = true;

    this.ApiService.changeApi().subscribe(
      ({ user }: { success: boolean; message: string; user: User }) => {
        console.log(user);
        this.loding = false;

        this.key = user.key;
        this.store.dispatch(updateOptions({ user: user }));
      }
    );
  }
}
