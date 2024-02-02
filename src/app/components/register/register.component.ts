import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPasswordStrengthValue } from '../../utils/password-strenth-value';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private EMAIL_PATTERN_REGEX = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$";

  passwordStrengthValue = 0;


  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    email: ['', Validators.compose([Validators.required, Validators.pattern(this.EMAIL_PATTERN_REGEX)])],
    password: ['', Validators.required],
  });

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  }
}
