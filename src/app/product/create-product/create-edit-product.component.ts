import {Component, computed, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Product, ProductFormModel} from '../model/product.model';
import {ProductStoreService} from '../productStoreService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    DynamicForm
  ],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.scss'
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  productModel = computed(() => ({
    name: {value: this.productStoreService.getProduct()?.name || '', required: true, minLength: 3},
    description: {value: this.productStoreService.getProduct()?.description || ''},
    price: {value: this.productStoreService.getProduct()?.price || 0, required: true, min: 1},
    quantity: {value: this.productStoreService.getProduct()?.quantity || 0, required: true, min: 1},
    category: {
      value: this.productStoreService.getProduct()?.category.id ?? null,
      required: true,
      options: this.categories(), // Array of objects [{ id: 1, name: 'Category 1' }]
    }
  }));

  categories:WritableSignal<Category[]> = signal<Category[]>([]);

  constructor(private productService: ProductService,
              private productStoreService: ProductStoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  onSubmit(newProduct: Product) {
    console.log(newProduct)
    // if(this.productStoreService.getEditMode()) {
    //   newProduct = this.createProductForEdit(newProduct);
    // }
    // this.productService.createProduct(newProduct).subscribe();
  }

  getCategories() {
    this.productService.getCategories().subscribe(categories => this.categories.set(categories))
  }

  createProductForEdit(product: Product): Product {
    return {
      id: this.productStoreService.getProduct().id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category
    }
  }

  ngOnDestroy() {
    this.productStoreService.setProduct(null!);
  }
}
