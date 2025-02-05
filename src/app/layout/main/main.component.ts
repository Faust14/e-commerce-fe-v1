import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main',
  template: `
    <div class="main-wrapper">
      <app-navbar/>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
  imports: [
    NavbarComponent,
    RouterOutlet
  ]
})

export class MainComponent {
}
