import {Component, computed} from '@angular/core';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';

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

  constructor(private productService: ProductService, private router: Router) {
  }

  onSubmit(category: Category) {
    this.productService.createCategory(category).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    })
  }
}
