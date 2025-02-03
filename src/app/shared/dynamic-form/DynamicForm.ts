import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {generateFormFields} from '../utils/generateFormFields';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    NgForOf
  ],
  template: `
    <div class="dynamic-form-container">
      <h2>{{ formTitle }}</h2>

      <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
        <ng-container *ngFor="let key of fieldKeys">

          <!-- Select Dropdown -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="isArrayField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>
            <mat-select [formControlName]="key">
              <mat-option *ngFor="let option of getFieldOptions(key)" [value]="option.id">
                {{ option.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Password Field with Toggle Visibility -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="isPasswordField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>
            <input
              matInput
              [type]="passwordVisibility[key] ? 'text' : 'password'"
              [formControlName]="key">
            <button mat-icon-button matSuffix (click)="togglePasswordVisibility(key)">
              <mat-icon>{{ passwordVisibility[key] ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>

            <!-- Password Validation -->
            <mat-error *ngIf="formGroup.controls[key].hasError('required')">
              {{ key | titlecase }} is required.
            </mat-error>
            <mat-error *ngIf="formGroup.controls[key].hasError('minlength')">
              Password must be at least {{ getMinLength(key) }} characters.
            </mat-error>
          </mat-form-field>

          <!-- Text, Number, or Textarea Inputs -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="!isArrayField(key) && !isPasswordField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>

            <textarea
              matInput
              *ngIf="isTextareaField(key)"
              [formControlName]="key">
            </textarea>

            <input
              matInput
              *ngIf="!isTextareaField(key)"
              [type]="getInputType(key)"
              [formControlName]="key">

            <!-- Validation Messages -->
            <mat-error *ngIf="formGroup.controls[key].hasError('required')">
              {{ key | titlecase }} is required.
            </mat-error>
            <mat-error *ngIf="formGroup.controls[key].hasError('min')">
              {{ key | titlecase }} must be at least {{ getMinValue(key) }}.
            </mat-error>
            <mat-error *ngIf="formGroup.controls[key].hasError('max')">
              {{ key | titlecase }} cannot be more than {{ getMaxValue(key) }}.
            </mat-error>
            <mat-error *ngIf="formGroup.controls[key].hasError('minlength')">
              {{ key | titlecase }} must be at least {{ getMinLength(key) }} characters.
            </mat-error>
            <mat-error *ngIf="formGroup.controls[key].hasError('maxlength')">
              {{ key | titlecase }} cannot be more than {{ getMaxLength(key) }} characters.
            </mat-error>
            <mat-error *ngIf="formGroup.get(key)?.hasError('email') && formGroup.get(key)?.touched">
              Please enter a valid email address.
            </mat-error>
          </mat-form-field>

          <div class="content">
            <ng-content></ng-content>
          </div>
        </ng-container>

        <button mat-raised-button color="primary" type="submit" [disabled]="formGroup.invalid">
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [`
    .dynamic-form-container {
      max-width: 400px;
      margin: 30px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .content {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      color: red;
    }
  `]
})
export class DynamicForm<T extends object> implements OnInit {
  @Input() model!: T;
  @Input() formTitle = 'Dynamic Form';
  @Output() formSubmit = new EventEmitter<any>();

  formGroup!: FormGroup;
  fieldKeys: string[] = [];
  passwordVisibility: { [key: string]: boolean } = {};

  ngOnInit() {
    this.formGroup = generateFormFields(this.model);
    this.fieldKeys = Object.keys(this.model);
  }

  getInputType(key: string): string {
    const field = (this.model as Record<string, any>)[key];
    if (field.email) return 'email';
    if (typeof field.value === 'number') return 'number';
    return 'text';
  }

  isArrayField(key: string): boolean {
    return Array.isArray((this.model as Record<string, any>)[key]);
  }

  isPasswordField(key: string): boolean {
    return (this.model as Record<string, any>)[key]?.password ?? false;
  }

  isTextareaField(key: string): boolean {
    return key.toLowerCase().includes('description');
  }

  getFieldOptions(key: string): any[] {
    return this.isArrayField(key) ? (this.model as Record<string, any>)[key] : [];
  }

  getMinValue(key: string): number | null {
    return (this.model as Record<string, any>)[key]?.min ?? null;
  }

  getMaxValue(key: string): number | null {
    return (this.model as Record<string, any>)[key]?.max ?? null;
  }

  getMinLength(key: string): number | null {
    return (this.model as Record<string, any>)[key]?.minLength ?? null;
  }

  getMaxLength(key: string): number | null {
    return (this.model as Record<string, any>)[key]?.maxLength ?? null;
  }

  togglePasswordVisibility(key: string) {
    this.passwordVisibility[key] = !this.passwordVisibility[key];
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }
}
