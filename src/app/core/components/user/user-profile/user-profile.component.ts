import { Component, ElementRef, EventEmitter, Input, Output, ViewChild,OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/interceptors';
import { ApiService } from 'src/app/features/user/services/api.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { ToastrCallService } from 'src/app/features/user/services/toastr.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges {
  @Input() user: User|null = null;
  @Input() profileImage: string = '';
  submit = false;
  @Output() openUserProfile: EventEmitter<void> = new EventEmitter();


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

}
