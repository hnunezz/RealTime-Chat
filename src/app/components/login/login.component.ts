import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  });

  handleSubmitLogin() {
    // if (this.loginForm.value && this.loginForm.valid) {
    //   const csrfToken = this.csrfTokenService.getToken;
    //   this.authService.login(this.loginForm.value, csrfToken).subscribe({
    //     next: (request: any) => {
    //       const token = request.token;
    //       this.authService.setCookie(token);
    //       this.authService.setLoggedIn(true);
    //     },
    //     error(error) {
    //       console.error('Erro ao fazer login', error);
    //     }
    //   });
    // }
  }
}
