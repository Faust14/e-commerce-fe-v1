import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartModel} from './cart-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiUrl = 'http://localhost:8083/api/orders';

  constructor(private http: HttpClient) {
  }

  createOrder(cartModel: CartModel) {
    return this.http.post(`${this.apiUrl}`, cartModel);
  }
}
