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

  getAllUsers(search: string): Observable<User[]> {
    const params = new HttpParams().append('search', search);
    return this.http.get<User[]>(`${this.apiUrl}/user`, {params});
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user`, user);
  }

  updateUserRole(role: string, userId: number): Observable<User> {
    const params = new HttpParams().append('role', role).append('userId', userId);
    return this.http.put<User>(`${this.apiUrl}/user/update-role`, {}, {params});
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}`)
  }

}
