import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }
}
