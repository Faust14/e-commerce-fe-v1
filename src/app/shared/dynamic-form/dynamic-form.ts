import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { generateFormFields } from '../utils/generateFormFields';

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

          <!-- Select Dropdown (Handles Both String and Object Options) -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="isSelectField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>
            <mat-select [formControlName]="key" [disabled]="isFieldDisabled(key)">
              <mat-option *ngFor="let option of getFieldOptions(key)" [value]="option?.id ?? option">
                {{ option?.name ?? option }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Password Field with Toggle Visibility -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="isPasswordField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>
            <input
              matInput
              [type]="passwordVisibility[key] ? 'text' : 'password'"
              [formControlName]="key"
              [disabled]="isFieldDisabled(key)">
            <button *ngIf="!isFieldDisabled(key)" mat-icon-button matSuffix (click)="togglePasswordVisibility(key)">
              <mat-icon>{{ passwordVisibility[key] ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>
          </mat-form-field>

          <!-- Text, Number, or Textarea Inputs -->
          <mat-form-field appearance="outline" class="full-width" *ngIf="!isSelectField(key) && !isPasswordField(key)">
            <mat-label>{{ key | titlecase }}</mat-label>

            <textarea
              matInput
              *ngIf="isTextareaField(key)"
              [formControlName]="key"
              [disabled]="isFieldDisabled(key)">
            </textarea>

            <input
              matInput
              *ngIf="!isTextareaField(key)"
              [type]="getInputType(key)"
              [formControlName]="key"
              [disabled]="isFieldDisabled(key)">
          </mat-form-field>

          <!-- Validation Messages -->
          <mat-error *ngIf="formGroup.get(key)?.hasError('required') && formGroup.get(key)?.touched">
            {{ key | titlecase }} is required.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('min') && formGroup.get(key)?.touched">
            {{ key | titlecase }} must be at least {{ getMinValue(key) }}.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('max') && formGroup.get(key)?.touched">
            {{ key | titlecase }} cannot be more than {{ getMaxValue(key) }}.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('nonZero') && formGroup.get(key)?.touched">
            {{ key | titlecase }} must be greater than 0.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('minlength') && formGroup.get(key)?.touched">
            {{ key | titlecase }} must be at least {{ getMinLength(key) }} characters.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('maxlength') && formGroup.get(key)?.touched">
            {{ key | titlecase }} cannot be more than {{ getMaxLength(key) }} characters.
          </mat-error>

          <mat-error *ngIf="formGroup.get(key)?.hasError('email') && formGroup.get(key)?.touched">
            Please enter a valid email address.
          </mat-error>

          <ng-content class="content"></ng-content>
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
    console.log('Field Keys:', this.fieldKeys);
  }

  getInputType(key: string): string {
    const field = (this.model as Record<string, any>)[key];
    if (field?.email) return 'email';
    if (field?.password) return 'password';
    if (typeof field?.value === 'number') return 'number';
    return 'text';
  }

  isSelectField(key: string): boolean {
    const field = (this.model as Record<string, any>)[key];

    return field?.options && Array.isArray(field.options) && field.options.length > 0;
  }

  isPasswordField(key: string): boolean {
    return key.toLowerCase() === 'password'; // Ensures only the password field is treated as a password
  }

  isTextareaField(key: string): boolean {
    return key.toLowerCase().includes('description');
  }

  isFieldDisabled(key: string): boolean {
    return (this.model as Record<string, any>)[key]?.disabled ?? false;
  }

  getFieldOptions(key: string): any[] {
    return (this.model as Record<string, any>)[key]?.options ?? [];
  }

  togglePasswordVisibility(key: string) {
    this.passwordVisibility[key] = !this.passwordVisibility[key];
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

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.getRawValue());
    }
  }
}
