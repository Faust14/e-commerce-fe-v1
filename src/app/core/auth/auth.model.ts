export interface Credentials {
  username: string;
  password: string;
}

export interface Register {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
}

export interface CredentialsFormModel {
  username: { value: string, required: boolean, minLength: 3 };
  password: { value: string; required: boolean; password: true; minLength: 6 };
}

export interface RegisterFormModel {
  firstname: { value: string, required: boolean, minLength: 3 };
  lastname: { value: string, required: boolean, minLength: 3 };
  email: { value: string, required: boolean };
  password: { value: string; required: boolean; password: true; minLength: 6 };
  username: { value: string, required: boolean, minLength: 3 };
}
