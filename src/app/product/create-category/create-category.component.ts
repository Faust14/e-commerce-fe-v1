import {Component, computed, Signal} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Category, CategoryFormModel} from '../model/category.model';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    DynamicForm
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  categoryFromModel = computed(() => ({
    name: {value: '', required: true, min: 3, max: 32},
  }))

  constructor(private productService: ProductService) {
  }

  onSubmit(category: Category) {
    this.productService.createCategory(category).subscribe()
  }
}
