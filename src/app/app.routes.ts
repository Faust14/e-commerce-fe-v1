import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {RoleGuard} from './core/auth/role.guard';
import {AuthGuard} from './core/auth/route.guard';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: '',
    canMatch: [AuthGuard],
    loadComponent: () =>
      import('./layout/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        canMatch: [RoleGuard],
        loadComponent: () =>
          import('./layout/empty.component').then((m) => m.EmptyComponent),
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadComponent: () =>
          import('./product/product.component').then((m) => m.Products),
      },
      {
        path: 'create-edit-product',
        pathMatch: 'full',
        loadComponent: () =>
          import('./product/create-product/create-edit-product.component').then((m) => m.CreateEditProductComponent),
      },
      {
        path: 'create-category',
        pathMatch: 'full',
        loadComponent: () =>
          import('./product/create-category/create-category.component').then((m) => m.CreateCategoryComponent),
      },
      {
        path: 'view-categories',
        pathMatch: 'full',
        loadComponent: () =>
          import('./product/category-view/category-view.component').then((m) => m.CategoryViewComponent),
      },
      {
        path: 'users',
        pathMatch: 'full',
        canMatch: [RoleGuard],
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
      },
      {
        path: 'edit-user',
        pathMatch: 'full',
        loadComponent: () =>
          import('./user/edit-user/edit-user.component').then((m) => m.EditUserComponent),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
