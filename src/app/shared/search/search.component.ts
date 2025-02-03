import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],

  template: `
    <mat-form-field appearance="outline" class="search-bar">
      <mat-icon *ngIf="searchText.length === 0" matPrefix>search</mat-icon>
      <mat-icon
        matPrefix
        *ngIf="searchText.length > 0"
        class="clear-icon"
        (click)="clearSearch()">
        close
      </mat-icon>
      <input matInput [(ngModel)]="searchText" (input)="onSearch()" placeholder="Search...">
    </mat-form-field>
  `,
  styles: [`
    .search-bar {
      width: 100%;
      margin-bottom: 16px;
      padding: 16px;
    }
  `]
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  searchText: string = '';
  onSearch(): void {
    this.searchTerm.emit(this.searchText.trim());
  }

  clearSearch(): void {
    this.searchText = '';
    this.onSearch(); // Emit empty string to reset search
  }
}
