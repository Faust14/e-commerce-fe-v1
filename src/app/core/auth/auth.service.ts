import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Credentials, Register} from './auth.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<{ jtwToken: string }> {
    return this.http.post<{ jtwToken: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.tokenSubject.next(response.jtwToken))
    );
  }

  logout() {
    this.tokenSubject.next(null);
  }

  register(user: Register): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, user);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getTokenValue(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): any {
    const token = this.getTokenValue();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  refreshAccessToken(): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken: this.refreshTokenSubject.value }).pipe(
      map(response => response.accessToken),
      tap(accessToken => {
        this.tokenSubject.next(accessToken);
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }
}
