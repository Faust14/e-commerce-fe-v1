import {Component, OnInit, signal} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Product} from './model/product.model';
import {ProductService} from './product.service';
import {SearchComponent} from '../shared/search/search.component';
import {MatIcon} from "@angular/material/icon";
import {ProductStoreService} from './productStoreService';
import {Router} from '@angular/router';

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

  productList= signal<Product[]>([])

  constructor(private productService: ProductService,
              private productStoreService: ProductStoreService,
              private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productList.set(data)
      },
      error: (err) => {
        this.productList.set([]);
        console.error('Error fetching products:', err)
      }
    });
  }

  filterProducts(searchTerm: string) {
    console.log(searchTerm)
  }

  onEditClick(product: Product) {
    console.log(product)
    this.productStoreService.setProduct(product)
    this.productStoreService.setEditMode(true);
    this.router.navigate(['create-edit-product']).then();
  }
}
