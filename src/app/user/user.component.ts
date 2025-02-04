import {Component, OnInit, signal} from '@angular/core';
import {User} from './model/user.model';
import {UserService} from './user.service';
import {DynamicTableComponent} from '../shared/dynamic-table/dynamic-table.component';
import {UserStoreService} from './user-store-service';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {AuthStoreService} from '../core/auth/auth.store.service';

@Component({
  selector: 'app-user',
  standalone:true,
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userList = signal<User[]>([])

  constructor(private userService: UserService,
              private userStoreService: UserStoreService,
              private authStoreService: AuthStoreService,
              private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.userList.set(data)
      },
      error: (err) => {
        this.userList.set([]);
        console.error('Error fetching products:', err)
      }
    });
  }
  onEditUser(user: User) {
    if(this.authStoreService.getUser().id === user.id) {
      this.userStoreService.setUser(this.authStoreService.getUser());
    } else {
      this.userStoreService.setUser(user);
    }
    this.router.navigate(['/edit-user']).then();
  }
  onDeleteUser(user: User) {
    console.log(user);
  }
}
