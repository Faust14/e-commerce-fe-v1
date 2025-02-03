import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './model/product.model';
import {Category} from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/create`, product);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(`${this.apiUrl}/categories/create`, category);
  }
}
