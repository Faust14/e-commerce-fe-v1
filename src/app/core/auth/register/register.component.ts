import {Component, computed, Signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../auth.service';
import {DynamicForm} from "../../../shared/dynamic-form/dynamic-form";
import {Register, RegisterFormModel} from '../auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
    imports: [
        CommonModule,
        DynamicForm,
        RouterLink
    ]
})
export class RegisterComponent {
  registerFormModel: Signal<RegisterFormModel> = computed(() => ({
    firstname: { value: '', required: true, minLength: 3 },
    lastname: { value: '', required: true, minLength: 3 },
    email: { value: '', required: true },
    password: { value: '', required: true, password: true, minLength: 6 },
    username: { value: '', required: true, minLength: 3 },
  }));
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  register(user: Register) {

    this.errorMessage = null;

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']).then();
      },
      error: () => {
        this.errorMessage = 'Registration failed. Try again.';
      }
    });
  }
}
