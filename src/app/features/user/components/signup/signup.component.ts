import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordPattern } from 'src/app/constants/pattern';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/core/models/interceptors';
import { Router } from '@angular/router';

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
        localStorage.setItem('token', data.token);
        this.errorMessage = '';
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
