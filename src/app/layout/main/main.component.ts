import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main',
  template: `
            <div class="main-wrapper">
                <app-navbar [isNavbarClosed]="isNavbarClosed" (navbarToggled)="toggleNavbar($event)" />
              <div> <router-outlet></router-outlet></div>
            </div>
    `,
  styleUrls: ['./main.component.scss'],
  imports: [
    NavbarComponent,
    RouterOutlet
  ]
})

export class MainComponent {
  isNavbarClosed = false;
  toggleNavbar($event: boolean) {
    this.isNavbarClosed = $event;
  }
}
