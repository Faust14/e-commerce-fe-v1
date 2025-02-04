export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface UserFormModel {
  firstname: { value: string, required: boolean, minLength: 3 };
  lastname: { value: string, required: boolean, minLength: 3 };
  email: { value: string, required: boolean };
  password: { value: string; required: boolean; password: true; minLength: 6 };
  username: { value: string, required: boolean, minLength: 3 };
  role: { value: string; required: boolean; };
}
