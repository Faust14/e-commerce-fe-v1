import {Component, Signal} from '@angular/core';
import {CartStoreService} from './cart-store.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CartService} from './cart-service';
import {AuthStoreService} from '../core/auth/auth.store.service';
import {CartModel} from './cart-model';
import {Product} from '../product/model/product.model';
import {AlertService} from '../shared/alert-service/alert.service';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    MatButton,
    MatIcon,
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: Signal<Product[]>;

  constructor(public cartStoreService: CartStoreService,
              private cartService: CartService,
              private authStoreService: AuthStoreService,
              private alertService: AlertService) {
    this.cart = toSignal(this.cartStoreService.getCart(), {initialValue: []});
  }

  removeFromCart(productId: number) {
    this.cartStoreService.removeFromCart(productId);
  }

  clearCart() {
    this.cartStoreService.clearCart();
  }

  createOrder() {
    const order: CartModel = {
      userId: this.authStoreService.getUser().id,
      productIds: this.cart().map((product: Product) => product.id)
    }
    this.cartService.createOrder(order).subscribe({
      next: (data) => {
        this.alertService.success('Order successfully created!');
        this.cartStoreService.clearCart();
      },
      error: (err) => {
        this.alertService.error(err.error.message);
      }
    })
  }
}
