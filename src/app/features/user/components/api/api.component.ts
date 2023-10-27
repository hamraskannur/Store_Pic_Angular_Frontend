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
  deleteImage=``
  loding = false;
 

  
  formattedJSON: string;

  constructor(
    private ApiService: ApiService,
    private store: Store<{ user: UserState }>
  ) {
    this.formattedJSON = JSON.stringify(
      {
        data: {
          _id: '2ndCYJK',
          image: 'https://i.ibb.co/w04Prt6/c1f64245afb2.gif',
          Thumbnail: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif',
          fullLink:'https://i.ibb.co/98W13PY/c1f64245afb2.gif',
          html:`<a href="http://localhost:4200/oneImage/6536261d8d652d7f0c8ca8eb"><img src="http://localhost:3008/1698047517041-9f0f68b2-9e6a-4fba-a138-755c7e3402c1-images-(1).jfif.png" alt="pexels-efe-ersoy-17102321" border="0" /></a>`,
          expiration: '0',
          delete_url: 'http://localhost:3800/deleteImage/565565656565656565656'
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
