import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api/login') || req.url.includes('api/register')) {
      return next.handle(req);
    }
    return this.authService.getToken().pipe(
      take(1),
      switchMap(token => {
        let clonedReq = req;
        if (token) {
          clonedReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(clonedReq).pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return this.handle401Error(clonedReq, next);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap(newToken => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken);

          return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })))
      );
    }
  }
}
