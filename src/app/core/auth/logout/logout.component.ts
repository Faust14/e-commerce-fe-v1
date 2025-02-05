import {Component, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStoreService} from '../auth.store.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../auth.service';
import {UserStoreService} from '../../../user/user-store-service';

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
export class LogoutComponent implements OnInit {
  initials = signal<string>('');

  constructor(private authStoreService: AuthStoreService,
              private router: Router,
              private authService: AuthService,
              private userStoreService: UserStoreService) {
  }

  ngOnInit() {
    this.createInitials();
  }

  createInitials() {
    const firstInitial = this.authStoreService.getUser().firstname?.charAt(0).toUpperCase() || '';
    const lastInitial = this.authStoreService.getUser().lastname.charAt(0).toUpperCase() || '';
    this.initials.set(`${firstInitial}${lastInitial}`);
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
