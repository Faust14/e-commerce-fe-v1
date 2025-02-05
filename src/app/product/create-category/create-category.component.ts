import {Component, computed} from '@angular/core';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service/alert.service';

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

  constructor(private productService: ProductService,
              private router: Router,
              private alertService: AlertService) {
  }

  onSubmit(category: Category) {
    this.productService.createCategory(category).subscribe({
      next: () => {
        this.alertService.success('Category created');
        this.router.navigate(['/products']).then();
      },
      error: (err) => {
        this.alertService.error(err.error().message);
      }
    })
  }
}
