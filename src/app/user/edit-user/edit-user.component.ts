import {Component, computed, Input, OnInit, signal} from '@angular/core';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {roles} from '../../shared/enums/roles';
import {AuthStoreService} from '../../core/auth/auth.store.service';
import {UserStoreService} from '../user-store-service';
import {User} from '../model/user.model';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service/alert.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    DynamicForm
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  user = signal<User>(null!)
  roles = Object.values(roles);

  userFormModel = computed(() => ({
    firstname: {value: this.user()?.firstname, required: true, minLength: 3, disabled: this.isFormFieldDisabled()},
    lastname: {value: this.user()?.lastname, required: true, minLength: 3, disabled: this.isFormFieldDisabled()},
    email: {value: this.user()?.email, required: true, disabled: this.isFormFieldDisabled()},
    password: {
      value: this.user()?.password,
      required: true,
      password: true,
      minLength: 6,
      disabled: this.isFormFieldDisabled()
    },
    username: {value: this.user()?.username, required: true, minLength: 3, disabled: this.isFormFieldDisabled()},
    role: {
      value: this.user()?.role || '',
      required: true,
      options: this.roles,
      disabled: !this.isAdmin()
    }
  }));

  constructor(private authStoreService: AuthStoreService,
              private userStoreService: UserStoreService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.user.set(this.userStoreService.getUser());
  }

  isFormFieldDisabled() {
    return this.authStoreService.getUser().id !== this.userStoreService.getUser().id;
  }

  isAdmin() {
    return this.authStoreService.getUser().role === roles.ADMIN;
  }

  onSubmit(user: User): void {
    if (this.authStoreService.getUser().id === this.userStoreService.getUser().id) {
      user.id = this.userStoreService.getUser().id;
      this.authStoreService.setUser(user);
      this.updateUser(user);
    } else if (this.isAdmin() && this.authStoreService.getUser().id !== this.userStoreService.getUser().id) {
      this.updateUser(user);
    }
  }

  updateUser(user: User): void {
    this.userService.updateUserRole(user.role, this.userStoreService.getUser().id).subscribe({
      next: () => {
        this.alertService.success('User updated successfully.');
        this.router.navigate(['/users']).then();
      },
      error: (err) => {
        this.alertService.error(err.error().message);
      }
    });
  }
}
