import { FormControl } from '@angular/forms';

export type LoginForm = {
  username: FormControl<string>;
  password: FormControl<string>;
};

export type RegisterForm = LoginForm & {
  email: FormControl<string>;
  confirmPassword: FormControl<string>;
};
