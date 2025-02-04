import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private _user = new BehaviorSubject<User>(null!);
  private user$ = this._user.asObservable();

  setUser(user: User) {
    this._user.next(user);
  }

  getUser(): User {
    return this._user.getValue();
  }
}
