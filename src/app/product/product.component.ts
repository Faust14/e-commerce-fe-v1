import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Product} from './model/product.model';
import {ProductService} from './product.service';
import {SearchComponent} from '../shared/search/search.component';
import {MatIcon} from "@angular/material/icon";
import {ProductStoreService} from './productStoreService';
import {Router} from '@angular/router';
import {AuthStoreService} from '../core/auth/auth.store.service';
import {roles} from '../shared/enums/roles';
import {useSearch} from '../shared/utils/searchUtil';
import {CartStoreService} from '../cart/cart-store.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgFor,
    SearchComponent,
    MatIcon
  ]
})
export class Products implements OnInit {

  productList = signal<Product[]>([])
  search = useSearch((search) => this.productService.getProducts(search));
  role = roles;

  constructor(private productService: ProductService,
              private productStoreService: ProductStoreService,
              private cartStoreService: CartStoreService,
              private router: Router,
              public authStoreService: AuthStoreService) {
  }

  ngOnInit() {
    this.createSearchStream();
  }

  filterProducts(searchTerm: string) {
    this.search.searchTerm.next(searchTerm);
  }

  createSearchStream() {
    this.search.data$.subscribe({
      next: (data) => this.productList.set(data),
      error: (err) => {
        this.productList.set([]);
        console.error('Error fetching users:', err);
      }
    });
  }

  onEditClick(product: Product) {
    this.productStoreService.setProduct(product)
    this.productStoreService.setEditMode(true);
    this.router.navigate(['create-edit-product']).then();
  }

  onDeleteClick(product: Product) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => this.productList.set(this.productList().filter(p => p.id !== product.id)),
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      })
    }

  addToCart(product: Product) {
    this.cartStoreService.addToCart(product);
  }
}
