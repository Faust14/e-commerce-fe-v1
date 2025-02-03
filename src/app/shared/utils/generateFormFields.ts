import { FormControl, FormGroup, Validators } from '@angular/forms';

export function generateFormFields<T extends object>(model: T): FormGroup {
  const formGroup: { [key: string]: FormControl } = {};

  Object.keys(model).forEach(key => {
    const field = (model as Record<string, any>)[key];

    let validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }
    if (field.max !== undefined) {
      validators.push(Validators.max(field.max));
    }
    if (field.minLength !== undefined) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength !== undefined) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.email) {
      validators.push(Validators.email);
    }

    formGroup[key] = new FormControl(field.value, validators);
  });

  return new FormGroup(formGroup);
}
