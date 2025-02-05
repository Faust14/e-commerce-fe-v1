import {Component} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AuthStoreService} from '../../core/auth/auth.store.service';
import {roles} from '../../shared/enums/roles';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isProductExpended = true;
  orderExpended = true;
  role = roles;
  constructor(public authStoreService: AuthStoreService) {
  }

  expendProduct() {
    this.isProductExpended = !this.isProductExpended;
  }

  expendOrder() {
    this.orderExpended = !this.orderExpended;
  }
}
