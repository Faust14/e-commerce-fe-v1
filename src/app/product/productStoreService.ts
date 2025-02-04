import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private _product = new BehaviorSubject<Product>(null!);
  private product$ = this._product.asObservable();
  private _editMode = new BehaviorSubject(false);
  private editProduct$ = this._editMode.asObservable();

  setProduct(product: Product) {
    this._product.next(product);
  }

  getProduct() {
    return this._product.getValue();
  }
  setEditMode(isEditMode: boolean) {
    this._editMode.next(isEditMode);
  }
  getEditMode() {
    return this._editMode.getValue();
  }
}
