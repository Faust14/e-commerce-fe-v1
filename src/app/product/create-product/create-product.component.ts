import {Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {DynamicForm} from '../../shared/dynamic-form/DynamicForm';
import {Product, ProductFormModel} from '../model/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    DynamicForm
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {
  productModel = computed(() => ({
    name: {value: '', required: true, minLength: 3},
    description: {value: ''},
    price: {value: null, required: true, min: 1},
    quantity: {value: null, required: true, min: 1},
    category: {value: this.categories(), required: true}
  }));

  categories:WritableSignal<Category[]> = signal<Category[]>([]);

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  onSubmit(product: Product) {
    this.productService.createProduct(product).subscribe();
  }

  getCategories() {
    this.productService.getCategories().subscribe(categories => this.categories.set(categories))
  }
}
