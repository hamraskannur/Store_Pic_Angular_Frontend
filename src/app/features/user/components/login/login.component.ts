import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { passwordPattern } from 'src/app/constants/pattern';
import { AuthResponse } from 'src/app/core/models/interceptors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { updateOptions } from 'src/app/stores/user/user.actions';
import { ToastrCallService } from '../../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  loginForm = this.FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
  });

  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submit = true;
    if (this.loginForm.valid ) {
      this.subscription = this.ApiService.userLogin(
        this.loginForm.value
      ).subscribe((data:AuthResponse) => {
      if(data.status){        
        this.store.dispatch(updateOptions({ user: data.user }));
        localStorage.setItem('token', data.token);
        this.errorMessage = '';
        this.ToastrService.showSuccess("successfully Login")
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
