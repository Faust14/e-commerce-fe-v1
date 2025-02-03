import {Component, OnInit, signal} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Product} from './model/product.model';
import {ProductService} from './product.service';
import {SearchComponent} from '../shared/search/search.component';


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
    SearchComponent
  ]
})
export class Products implements OnInit {

  productList= signal<Product[]>([])

  constructor(private productService: ProductService) {}

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
}
