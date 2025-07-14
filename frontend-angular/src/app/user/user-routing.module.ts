import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { OrdersComponent } from './components/orders/orders.component'
const routes: Routes = [

  {
    path: '',
    component: UserLayoutComponent,
    children: [
      // Default redirect
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // ===== Core Pages =====
      { path: 'dashboard', component: DashboardComponent },

      // ===== Management =====
      //  { path: 'customers', component: CustomersComponent },
       { path: 'orders', component: OrdersComponent },
     // { path: 'products', component: ProductsComponent },
     // { path: 'inventory', component: InventoryComponent },

      // ===== Pharmacy-Specific =====
     // { path: 'prescriptions', component: PrescriptionsComponent },
     // { path: 'suppliers', component: SuppliersComponent },

      // ===== System =====
     // { path: 'access-control', component: AccessControlComponent },
     // { path: 'settings', component: SettingsComponent },
     // { path: 'reports', component: ReportsComponent },

      // Wildcard fallback (keep at bottom)
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
