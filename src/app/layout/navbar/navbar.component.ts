import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

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
  @Input()
  isNavbarClosed = false;
  @Output()
  navbarToggled = new EventEmitter<boolean>();

  isProductExpended = true;
  orderExpended = true;

  expendProduct() {
    this.isProductExpended = !this.isProductExpended;
  }

  expendOrder() {
    this.orderExpended = !this.orderExpended;
  }
}
