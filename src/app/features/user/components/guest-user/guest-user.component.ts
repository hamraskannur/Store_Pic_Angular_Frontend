import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.css']
})
export class GuestUserComponent {
  fileProgress: number = 0;
  selectedImage: string | ArrayBuffer | null = null;
  file: File | null = null;
  startUpload = true;
  errorMessage = '';
  selectedExpirationTime: number = 0;

  constructor(private ApiService: ApiService,private router: Router) {}

  fileSelectHandler(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      if (this.file.type.startsWith('image/')) {
        this.errorMessage=""
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
      this.ApiService.guestUserUploadImage(formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.fileProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response ) {
          if(event.body){
            if(event.body.success){
              this.startUpload=false
              this.fileProgress = 0;
              this.router.navigate(['/oneImage', event.body.image._id]);
            }else{
              this.startUpload=false
              this.errorMessage=event.body.message
            }
          }

        }
      });
    }
  }
}
