import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';
import { LoginForm } from '../../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isSubmitted = false;
  public loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });
  // }
  isPasswordVisible: any;

  // get email() {
  //   return this.loginForm.get('email');

  constructor(private authService: AuthService) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    this.loginForm.markAsTouched();
    this.loginForm.valid &&
      this.authService.login(this.loginForm.getRawValue());
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
