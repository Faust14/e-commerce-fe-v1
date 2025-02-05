import {Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {User} from './model/user.model';
import {UserService} from './user.service';
import {DynamicTableComponent} from '../shared/dynamic-table/dynamic-table.component';
import {UserStoreService} from './user-store-service';
import {Router} from '@angular/router';
import {AuthStoreService} from '../core/auth/auth.store.service';
import {SearchComponent} from '../shared/search/search.component';
import {useSearch} from '../shared/utils/searchUtil';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    DynamicTableComponent,
    SearchComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
//TODO: ocisti user-a
export class UserComponent implements OnInit {

  userList = signal<User[]>([])
  search = useSearch((search) => this.userService.getAllUsers(search));

  constructor(private userService: UserService,
              private userStoreService: UserStoreService,
              private authStoreService: AuthStoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createSearchStream();
  }

  onEditUser(user: User) {
    if (this.authStoreService.getUser().id === user.id) {
      this.userStoreService.setUser(this.authStoreService.getUser());
    } else {
      this.userStoreService.setUser(user);
    }
    this.router.navigate(['/edit-user']).then();
  }

  filterUsers(filter: string) {
    this.search.searchTerm.next(filter);
  }

  onDeleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: (data) =>
        this.userList.set(this.userList().filter(u => u.id !== user.id)),
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    })
  }

  createSearchStream() {
    this.search.data$.subscribe({
      next: (data) => this.userList.set(data),
      error: (err) => {
        this.userList.set([]);
        console.error('Error fetching users:', err);
      }
    });
  }
}
