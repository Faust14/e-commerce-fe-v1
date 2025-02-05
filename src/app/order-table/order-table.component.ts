import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Order} from './model';
import {OrderService} from './order.service';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {AuthStoreService} from '../core/auth/auth.store.service';

@Component({
  selector: 'app-order-table',
  standalone: true,
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe,
    MatIcon,
    MatIconButton,
    NgClass,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  expandedOrders: Map<number, boolean> = new Map();

  constructor(private orderService: OrderService,
              private cdr: ChangeDetectorRef,
              private authStoreService: AuthStoreService,) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      this.expandedOrders.clear();
      this.cdr.detectChanges();
    });
  }

  toggleRow(order: Order) {
    this.expandedOrders.set(order.id, !this.isExpanded(order));
    this.orders = [...this.orders];
  }

  isExpanded(order: Order): boolean {
    return this.expandedOrders.get(order.id) || false;
  }

  onDelete(order: Order) {
    this.orderService.deleteOrder(order.id, this.authStoreService.getUser().id).subscribe({
      next: (data) => this.orders = this.orders.filter(o => o.id !== order.id),
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    })
  }

  trackByFn(index: number, item: Order) {
    return item.id;
  }
}
