import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

export function generateFormFields<T extends object>(model: T): FormGroup {
  const formGroup: { [key: string]: FormControl } = {};

  Object.keys(model).forEach(key => {
    const field = (model as Record<string, any>)[key] || {};
    let validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (typeof field.value === 'number' && field.required) {
      validators.push(requiredNonZeroNumber());
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

    let value = field.value !== undefined ? field.value : '';

    if (Array.isArray(field.options) && field.options.length > 0) {
      if (typeof field.options[0] === 'object' && 'id' in field.options[0]) {
        value = field.value ?? field.options[0].id;
      }
    }

    formGroup[key] = new FormControl({value, disabled: field.disabled ?? false}, validators);
  });

  return new FormGroup(formGroup);
}

function requiredNonZeroNumber(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === 0) {
      return {nonZero: true};
    }
    return null;
  };
}
