import {Component, OnInit, signal} from '@angular/core';
import {ProductService} from '../product.service';
import {DynamicTableComponent} from '../../shared/dynamic-table/dynamic-table.component';
import {Category} from '../model/category.model';
import {SearchComponent} from '../../shared/search/search.component';
import {useSearch} from '../../shared/utils/searchUtil';
import {ProductStoreService} from '../productStoreService';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service/alert.service';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [DynamicTableComponent, SearchComponent],
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  categoryList = signal<Category[]>([]);
  search = useSearch((search) => this.productService.getCategories(search));

  constructor(private productService: ProductService,
              private productStoreService: ProductStoreService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.createSearchStream();
  }

  createSearchStream() {
    this.search.data$.subscribe({
      next: (data) => this.categoryList.set(data),
      error: (err) => {
        this.categoryList.set([]);
        console.error('Error fetching users:', err);
      }
    });
  }

  filterCategories(searchTerm: string) {
    this.search.searchTerm.next(searchTerm);
  }

  onEditCategory(category: Category) {
    this.productStoreService.setCategory(category);
    this.productStoreService.setEditMode(true);
    this.router.navigate(['/create-category']).then();
  }

  onDeleteCategory(category: Category) {
    this.productService.deleteCategory(category.id).subscribe({
      next: () => {
        this.alertService.success('Category deleted successfully.');
        this.categoryList.set(this.categoryList().filter(p => p.id !== category.id));
      },
      error: (err) => {
        this.alertService.error(err.error.message);
        console.error('Error fetching users:', err);
      }
    });
  }
}
