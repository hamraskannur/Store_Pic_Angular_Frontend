import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordPattern } from 'src/app/constants/pattern';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/core/models/interceptors';
import { Router } from '@angular/router';
import { UserState } from 'src/app/stores/user/user.reducer';
import { updateOptions } from 'src/app/stores/user/user.actions';
import { ToastrCallService } from '../../services/toastr.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  submit = false;
  passwordShown = false;
  errorMessage=""
  subscription: Subscription | undefined;

  constructor(
    private FormBuilder: FormBuilder,
    private ApiService: ApiService,
    private router: Router,
    private store: Store<{ user: UserState }>,
    private ToastrService:ToastrCallService
  ) {}

  signupForm = this.FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    userName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
  });

  get f() {
    return this.signupForm.controls;
  }
  onSubmit(): void {
    this.submit = true;
    if (this.signupForm.valid ) {
      console.log(this.signupForm.value);
      this.subscription = this.ApiService.userSignup(
        this.signupForm.value
      ).subscribe((data:AuthResponse) => {
      if(data.status){
        this.store.dispatch(updateOptions({ user: data.user }));
        localStorage.setItem('token', data.token);
        this.errorMessage = '';
        this.ToastrService.showSuccess("successfully registered")
        this.router.navigate(['/']);
      }else{
        this.errorMessage=data.message
      }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }
}
