import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {roles} from '../../shared/enums/roles';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.authService.getCurrentUser();
    const hasAccess = user?.role === roles.ADMIN;
    if (!hasAccess) {
      this.router.navigate(['/empty']).then();
    }
    return hasAccess;
  }
}
