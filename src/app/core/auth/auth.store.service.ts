import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../user/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private _user = new BehaviorSubject<User>(null!);
  user$ = this._user.asObservable();

  setUser(user: User) {
    this._user.next(user);
  }

  getUser(): User {
    return this._user.getValue();
  }
}
