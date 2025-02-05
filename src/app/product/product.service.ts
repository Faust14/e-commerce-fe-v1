import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './model/product.model';
import {Category} from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {
  }

  getProducts(search: string): Observable<Product[]> {
    const params = new HttpParams().append('search', search);
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {params});
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/create`, product);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.apiUrl}/products/update`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  getCategories(search?: string): Observable<Category[]> {
    let params;
    if(search) {
       params = new HttpParams().append('search', search);
    }
    return this.http.get<Category[]>(`${this.apiUrl}/categories`,{params});
  }


  createCategory(category: Category) {
    return this.http.post<Category>(`${this.apiUrl}/categories/create`, category);
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(`${this.apiUrl}/categories/`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

}
