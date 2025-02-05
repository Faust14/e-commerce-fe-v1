import {Component, computed} from '@angular/core';
import {DynamicForm} from '../../shared/dynamic-form/dynamic-form';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service/alert.service';
import {ProductStoreService} from '../productStoreService';

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
    name: {value: this.productStoreService.getCategory()?.name || '', required: true, min: 3, max: 32},
  }))

  constructor(private productService: ProductService,
              private router: Router,
              private alertService: AlertService,
              private productStoreService: ProductStoreService) {
  }

  onSubmit(category: Category) {
    if (this.productStoreService.getEditMode()) {
      category.id = this.productStoreService.getCategory().id;
      this.productService.updateCategory(category).subscribe({
        next: () => {
          this.productStoreService.clearState();
          this.alertService.success('Category updated!');
          this.router.navigate(['/products']).then();
        },
        error: (err) => {
          this.alertService.error(err.error.message);
        }
      })
    } else {
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
}
