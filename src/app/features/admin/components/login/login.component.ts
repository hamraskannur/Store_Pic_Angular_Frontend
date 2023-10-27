import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { passwordPattern } from 'src/app/constants/pattern';
import { AuthResponse, User } from 'src/app/core/models/interceptors';
import { UserState } from 'src/app/stores/user/user.reducer';
import { updateOptions } from 'src/app/stores/user/user.actions';
import { AdminApiService } from '../../services/admin-api.service';

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
    private ApiService: AdminApiService,
    private router: Router,
    private store: Store<{ user: UserState }>

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
      console.log(this.loginForm.value);
      this.subscription = this.ApiService.adminLogin(
        this.loginForm.value
      ).subscribe((data:{message: string, status: Boolean,token:string}) => {
      if(data.status){        
        localStorage.setItem('adminToken', data.token);
        this.errorMessage = '';
        this.router.navigate(['/admin']);
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
