import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../product/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  private cart: Product[] = [];
  private _cartSubject = new BehaviorSubject<Product[]>([]);
  private sum = new BehaviorSubject<number>(0);
  sum$ = this.sum.asObservable();

  getCart() {
    return this._cartSubject.asObservable();
  }

  addToCart(product: Product) {
    this.sum.next(0)
    this.cart.push({...product, quantity: 1});
    let sum = 0;
    this.cart.forEach(cart => {
      sum += cart.price;
    })
    this.sum.next(sum);
    this._cartSubject.next([...this.cart]);
  }

  removeFromCart(productId: number) {
    const product = this.cart.find((product) => product.id === productId);
    this.cart = this.cart.filter((product) => product.id !== productId);
    if (product) {
      this.sum.next(this.sum.getValue() - product?.price);
    }
    this._cartSubject.next([...this.cart]);
  }

  clearCart() {
    this.cart = [];
    this._cartSubject.next([]);
    this.sum.next(0)
  }
}
