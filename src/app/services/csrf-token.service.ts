import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CsrfTokenService {
  private csrfToken!: string;

  get getToken(): string { return this.csrfToken }

  constructor() { this.fetchCsrfToken() }

  private fetchCsrfToken(): void {
    this.csrfToken = 'token-csrf-backend';
  }

}
