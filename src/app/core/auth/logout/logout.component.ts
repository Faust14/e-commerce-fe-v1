import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStoreService} from '../auth.store.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../auth.service';
import {UserStoreService} from '../../../user/user-store-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MatMenu,
    MatButton,
    MatMenuTrigger,
    MatIcon,
    MatMenuItem
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  authStoreService = inject(AuthStoreService);
  router = inject(Router);
  authService = inject(AuthService);
  userStoreService = inject(UserStoreService);
  destroyRef$ = inject(DestroyRef);

  user = signal(this.authStoreService.getUser());
  initials = computed(() => this.getInitials(this.user()));

  constructor() {
    effect(() => {
      this.authStoreService.user$
        .pipe(takeUntilDestroyed(this.destroyRef$))
        .subscribe((user) => this.user.set(user));
    });
  }

  getInitials(user: { firstname?: string; lastname?: string }) {
    if (!user) return '';
    return `${user.firstname?.charAt(0).toUpperCase() || ''}${user.lastname?.charAt(0).toUpperCase() || ''}`;
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }

  onEditUserClick() {
    this.userStoreService.setUser(this.authStoreService.getUser());
    this.router.navigate(['/edit-user']).then();
  }
}
