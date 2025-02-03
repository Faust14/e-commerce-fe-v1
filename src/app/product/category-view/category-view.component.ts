import { Component, signal, computed } from '@angular/core';
import { ProductService } from '../product.service';
import { DynamicTableComponent } from '../../shared/dynamic-table/dynamic-table.component';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent {
  categoryList = signal<Category[]>([]);

  constructor(private productService: ProductService) {
    this.getAllCategories();
  }

  getAllCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categoryList.set(categories);
    });
  }

  onEditCategory(category: Category) {
    console.log('Editing Category:', category);
  }

  onDeleteCategory(category: Category) {
    console.log('Deleting Category:', category);
  }
}
