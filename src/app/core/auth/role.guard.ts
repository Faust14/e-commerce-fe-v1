import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.authService.getCurrentUser();
    console.log(user)
    const hasAccess = user?.role === 'ADMIN';
    if (!hasAccess) {
      this.router.navigate(['/unauthorized']);
    }
    return hasAccess;
  }
}
