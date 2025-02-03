export interface Category {
  id: number;
  name: string;
}

export interface CategoryFormModel {
  name: { value: string; required: boolean, minLength: 3 };
}
