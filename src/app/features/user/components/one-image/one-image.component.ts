import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image, User } from 'src/app/core/models/interceptors';
import { ApiService } from '../../services/api.service';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-one-image',
  templateUrl: './one-image.component.html',
  styleUrls: ['./one-image.component.css'],
})
export class OneImageComponent implements OnInit {
  image: Image | undefined;
  popup = false;
  userId:string |null=null
  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  ngOnInit() {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.userId = user._id;
      }
    });
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.ApiService.getOneImages(id).subscribe(
          ({
            success,
            image,
          }: {
            success: boolean;
            message: string;
            image: Image;
          }) => {
            if (success) {
              this.image = image;
            } else {
              this.router.navigate(['/404']);
            }
          }
        );
      } else {
        this.router.navigate(['/404']);
      }
      console.log('ID:', id);
    });
  }

  copyToClipboard(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
  }

  deleteImagePopup() {
    this.popup = !this.popup;
  }
}
