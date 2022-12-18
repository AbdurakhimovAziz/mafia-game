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
  public loginForm = new FormGroup<LoginForm>({
    // email: new FormControl('', {
    //   nonNullable: true,
    //   validators: [Validators.required, Validators.email]
    // }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  constructor(private authService: AuthService) {}

  // get email() {
  //   return this.loginForm.get('email');
  // }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    console.log(this.loginForm.value);
    // this.authService.login(this.loginForm.value);
  }
}
