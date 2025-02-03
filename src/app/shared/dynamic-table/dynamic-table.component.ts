import { Component, Input, Output, EventEmitter, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { generateTableHeaders } from '../utils/generateTableHeaders';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="mat-table-container max-width">
      <table mat-table [dataSource]="dataSignal()" matSort>

        <!-- Dynamic Columns -->
        <ng-container *ngFor="let header of headers()" [matColumnDef]="header.key">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ header.label }}
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element[header.key] }}
          </td>
        </ng-container>

        <!-- Action Buttons (Edit/Delete) -->
        <ng-container *ngIf="actionsEnabled" [matColumnDef]="'actions'">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="edit.emit(element)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete.emit(element)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .max-width{
      max-width: 86%;
    }
  `]
})
export class DynamicTableComponent<T> {
  @Input() set data(value: T[]) {
    this.dataSignal.set(value); // ✅ Automatically updates when `data` changes
  }
  @Input() actionsEnabled = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  dataSignal = signal<T[]>([]);

  headers = computed(() => generateTableHeaders(this.dataSignal()));

  get displayedColumns(): string[] {
    const columns = this.headers().map(header => header.key);
    if (this.actionsEnabled) {
      columns.push('actions');
    }
    return columns;
  }
}
