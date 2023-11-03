import { Component, ElementRef, EventEmitter, Input, Output, ViewChild,OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/interceptors';
import { ApiService } from 'src/app/features/user/services/api.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { ToastrCallService } from 'src/app/features/user/services/toastr.service';
import { updateOptions } from 'src/app/stores/user/user.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges {
  @Input() user: User|null = null;
  @ViewChild('profileImageRef', { static: false }) profileImageRef:| ElementRef| undefined;
  @Output() openUserProfile: EventEmitter<void> = new EventEmitter();
  
  file: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  submit = false;
  errorMessage=""

  constructor(
    private FormBuilder: FormBuilder,
    private ApiService: ApiService,
    private store: Store<{ user: UserState }>,
    private ToastrService: ToastrCallService
  ) {}

  userForm = this.FormBuilder.group({
    userName: ["", [Validators.required, Validators.minLength(6)]],
  });

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submit = true;
    if (this.userForm.valid) {
      this.errorMessage=""
        if(this.file && this.userForm.value.userName ){
          const formData = new FormData();
      formData.append('image', this.file);
      formData.append('username', this.userForm.value.userName);
          this.ApiService.updateUserImage(formData).subscribe(({success,user,message}:{success: boolean; message: string ,user:User})=>{
            if(success){
              this.file=null
              this.ToastrService.showSuccess("User profile updated successfully")
              this.store.dispatch(updateOptions({ user:user }));
            }else{
              this.errorMessage=message
            }
          })
        }else if(!this.file && this.userForm.value.userName && this.userForm.value.userName!==this.user?.username){

          this.ApiService.updateUserName({username:this.userForm.value.userName}).subscribe(({success,user,message}:{success: boolean; message: string ,user:User})=>{
            if(success){
              this.file=null
              this.ToastrService.showSuccess("User profile updated successfully")
              this.store.dispatch(updateOptions({ user:user }));
            }else{
              this.errorMessage=message
            }
          })
        }
    }
  }

  cancelProfile(){
  this.openUserProfile.emit()
  }

  ngOnChanges(): void {
    if (this.user) {
      this.userForm.patchValue({
        userName: this.user.username,
      });
    }
  }

  ImgChangeHandler(e: Event): void {
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
}
