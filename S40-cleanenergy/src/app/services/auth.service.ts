import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN_KEY = 'auth_token';
  private readonly API_URL = environment.authUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasJwtToken());
  
  constructor(private http: HttpClient, private router: Router) {
    this.checkJwtToken();
  }

  private checkJwtToken(): void {
    const token = localStorage.getItem(this.JWT_TOKEN_KEY);
    this.isAuthenticatedSubject.next(!!token);
  }

  private hasJwtToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  private setJwtToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  login(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setJwtToken(response.token);
          }
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Login error'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

}