import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core';
import { CustomValidators, RegisterForm } from '../../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public isPasswordVisible = false;
  public isConfirmPasswordVisible = false;
  public isSubmitted = false;
  public registerForm = new FormGroup<RegisterForm>(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  constructor(private auth: AuthService) {}

  public get email() {
    return this.registerForm.get('email');
  }

  public get username() {
    return this.registerForm.get('username');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  public get passwordMismatch(): boolean {
    return this.registerForm.hasError('mismatch');
  }

  public onSubmit() {
    console.log(this.registerForm.value);
    this.isSubmitted = true;
    this.registerForm.markAsTouched();
    if (!this.registerForm.valid) return;
    this.auth.register(this.registerForm.getRawValue());
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
