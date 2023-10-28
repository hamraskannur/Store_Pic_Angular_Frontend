import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/interceptors';
import { ApiService } from 'src/app/features/user/services/api.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { ToastrCallService } from 'src/app/features/user/services/toastr.service';
import { passwordPattern } from 'src/app/constants/pattern';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  @Input() username: string = '';
  @Input() profileImage: string = '';
  submit = false;
  @Output() openUserProfile: EventEmitter<void> = new EventEmitter();
  @ViewChild('imageInput') imageInput: ElementRef | undefined;


  constructor(
    private FormBuilder: FormBuilder,
    private ApiService: ApiService,
    private store: Store<{ user: UserState }>,
    private ToastrService: ToastrCallService
  ) {}

  loginForm = this.FormBuilder.group({
    userName: [this.username, [Validators.required, Validators.minLength(6)]],
  });

  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submit = true;
    if (this.loginForm.valid) {

    }
  }


  selectImage() {
    // Trigger the hidden file input element
    console.log("kokokoko");
    
    if (this.imageInput) {
    this.imageInput.nativeElement.click();
    }
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      // Here you can handle the selected image, for example, display it and upload it to the server
      const imageUrl = URL.createObjectURL(selectedFile);
      this.profileImage = imageUrl;
    }
  }

  cancelProfile(){
  this.openUserProfile.emit()
  }
}
