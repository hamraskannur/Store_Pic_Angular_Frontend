import { Component, EventEmitter, Output } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { Image, User } from 'src/app/core/models/interceptors';
import { ToastrCallService } from '../../../services/toastr.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css'],
})
export class UploadimageComponent {
  @Output() addImage: EventEmitter<Image> = new EventEmitter<Image>();
  fileProgress: number = 0;
  selectedImage: string | ArrayBuffer | null = null;
  file: File | null = null;
  startUpload = false;
  errorMessage = '';
  selectedExpirationTime: number = 0;
  username: string | null = null;
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private store: Store<{ user: UserState }>,
    private ToastrService: ToastrCallService
  ) {}

  ngOnInit(): void {
    this.userDataAndOptions$.subscribe(({ user }: { user: User | null }) => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  fileSelectHandler(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      if (this.file.type.startsWith('image/')) {
        this.errorMessage = '';
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
        if (this.file.size <= maxSizeInBytes) {
          const reader = new FileReader();
          reader.onload = () => {
            this.selectedImage = reader.result;
          };
          reader.readAsDataURL(this.file);
        } else {
          this.errorMessage =
            'Please select an image that is 10 MB or smaller.';
        }
      } else {
        this.errorMessage = 'plase select image';
      }
    }
  }

  uploadFiles() {
    this.startUpload = true;
    this.fileProgress = 5;
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('expirationTime', this.selectedExpirationTime.toString());
      if (this.username) {
        this.ApiService.uploadImage(formData).subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.fileProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            if (event.body) {
              if (event.body.success) {
                this.addImage.emit(event.body.image);
                this.ToastrService.showSuccess('Successfully upload an image');
                this.startUpload = false;
                this.fileProgress = 0;
                this.selectedImage=null
              } else {
                this.errorMessage = event.body.message;
              }
            }
          }
        });
      } else {
        this.ApiService.guestUserUploadImage(formData).subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.fileProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            if (event.body) {
              if (event.body.success) {
                this.startUpload = false;
                this.fileProgress = 0;
                this.selectedImage=null
                this.ToastrService.showSuccess('Successfully upload an image');
                this.router.navigate(['/oneImage', event.body.image._id]);
              } else {
                this.startUpload = false;
                this.errorMessage = event.body.message;
              }
            }
          }
        });
      }
    }
  }
}
