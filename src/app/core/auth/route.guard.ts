import {Injectable} from '@angular/core';
import {CanMatch, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {
  }

  canMatch(): boolean | Observable<boolean> | Promise<boolean> {
    const isLoggedIn = !!this.authService.getTokenValue();
    if (!isLoggedIn) {
      this.router.navigate(['/login']).then();
    }
    return isLoggedIn;
  }
}

