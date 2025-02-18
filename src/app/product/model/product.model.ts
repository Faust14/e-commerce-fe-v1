import {Category} from './category.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  description: string;
  quantity: number;
}

export interface ProductFormModel {
  name: { value: string; required: boolean, minLength: 3 };
  description?: { value: string };
  price: { value?: number; required: boolean; min: number };
  quantity: { value?: number; required: boolean; min: number };
  category: { value: string; required: boolean };
}
