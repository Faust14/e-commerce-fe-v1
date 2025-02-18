import {Component, computed, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Product, ProductFormModel} from '../model/product.model';
import {ProductStoreService} from '../productStoreService';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service/alert.service';

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
      options: this.categories(),
    }
  }));

  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  constructor(private productService: ProductService,
              public productStoreService: ProductStoreService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  onSubmit(newProduct: any) {
    if (this.productStoreService.getEditMode()) {
      const category = this.categories().find(category => category.id === newProduct.category);
      newProduct = this.createProductForEdit(newProduct);
      if (category) {
        newProduct.category = category;
        this.productService.updateProduct(newProduct).subscribe({
          next: () => {
            this.router.navigate(['/products']);
            this.alertService.success('Product updated!');
          },
          error: (err) => {
            this.alertService.error(err.error.message);
          }
        });
      }
    } else {
      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          this.router.navigate(['/products']);
          this.alertService.success('Product created!');
        },
        error: (err) => {
          this.alertService.error(err.error.message);
        }
      });
    }
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
    this.productStoreService.clearState();
  }
}
