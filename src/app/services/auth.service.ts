import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IUsers } from '../models/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private cookieService = inject(CookieService);

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  get isLogged(): boolean {
    const token = this.cookieService.get('token');
    return (token && !this.jwtHelper.isTokenExpired(token)) as boolean;
  }

  login(user: IUsers, csrfToken: string): Observable<any> {
    return this.http.post<any>('http://backend.com/login', { user, csrfToken });
  }

  logout(): void {
    this.cookieService.delete('token');
    this.loggedInSubject.next(false);
  }

  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  setCookie(token: any) {
    this.cookieService.set('token', token);
  }
}
