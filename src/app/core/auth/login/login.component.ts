import {Component, computed, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth.service';
import {Router, RouterLink} from '@angular/router';
import {DynamicForm} from '../../../shared/dynamic-form/DynamicForm';
import {Credentials, CredentialsFormModel} from '../auth.model';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DynamicForm
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string | null = null;
  loginFormModel: Signal<CredentialsFormModel> = computed(() => ({
    username: {value: '', required: true, minLength:3},
    password: {value: '', required: true, minLength: 6, password: true}
  }));

  constructor(private authService: AuthService, private router: Router) {
  }

  login(credentials: Credentials) {
    this.authService.login(credentials).pipe(
      catchError(() => {
        this.errorMessage = 'Wrong Username or password';
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/products']).then();
      }
    });
  }
}
