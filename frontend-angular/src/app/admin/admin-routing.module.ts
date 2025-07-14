import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoriesComponent } from './components/category/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: UsersComponent },
      { path: 'add-customer', component:  AddUserComponent},
      { path: 'edit-customer', component: EditUserComponent },
      { path: 'products', component:  ProductsComponent},
      { path: 'add-product', component:  AddProductComponent},
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products/categories', component: CategoriesComponent }




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
