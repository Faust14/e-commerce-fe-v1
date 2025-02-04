import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/update`, user);
  }

  updateUserRole(role: string, userId: number): Observable<User> {
    const params = new HttpParams().append('role', role).append('userId', userId);
    return this.http.put<User>(`${this.apiUrl}/user/update-role`, {}, {params});
  }
}
