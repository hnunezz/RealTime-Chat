import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CsrfTokenService } from '../../services/csrf-token.service';
import { getPasswordStrengthValue } from '../../utils/password-strenth-value';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    CsrfTokenService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public csrfTokenService = inject(CsrfTokenService);

  passwordStrengthValue = 0;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  });

  handleSubmitLogin() {
    if (this.loginForm.value && this.loginForm.valid) {
      const csrfToken = this.csrfTokenService.getToken;
      this.authService.login(this.loginForm.value, csrfToken).subscribe({
        next: (request: any) => {
          const token = request.token;
          this.authService.setCookie(token);
          this.authService.setLoggedIn(true);
        },
        error(error) {
          console.error('Erro ao fazer login', error);
        }
      });
    }
  }

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  }

  navigateToRegister() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }
}
