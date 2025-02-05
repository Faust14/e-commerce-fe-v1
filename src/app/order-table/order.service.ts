import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from './model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8083/api/orders';

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteOrder(ordedrId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ordedrId}/${userId}`);
  }
}
