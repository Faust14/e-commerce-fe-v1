import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './model/product.model';
import {Category} from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private _product = new BehaviorSubject<Product>(null!);
  private product$ = this._product.asObservable();
  private _editMode = new BehaviorSubject(false);
  private editProduct$ = this._editMode.asObservable();
  private _category = new BehaviorSubject<Category>(null!);
  private _category$ = this._category.asObservable();

  setProduct(product: Product) {
    this._product.next(product);
  }

  getProduct() {
    return this._product.getValue();
  }

  setCategory(category: Category) {
    this._category.next(category);
  }

  getCategory() {
    return this._category.getValue();
  }

  setEditMode(isEditMode: boolean) {
    this._editMode.next(isEditMode);
  }

  getEditMode() {
    return this._editMode.getValue();
  }

  clearState() {
    this._product.next(null!);
    this.setCategory(null!);
    this.setEditMode(false);
  }
}
