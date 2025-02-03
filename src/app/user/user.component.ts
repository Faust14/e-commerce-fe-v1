import {Component, OnInit, signal} from '@angular/core';
import {User} from './model/user.model';
import {UserService} from './user.service';
import {DynamicTableComponent} from '../shared/dynamic-table/dynamic-table.component';

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

  constructor(private userService: UserService) {}

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
    console.log(user)
  }
  onDeleteUser(user: User) {
    console.log(user);
  }
}
