import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';

const routes: Routes = [

  {
      path: '',
      component: UserLayoutComponent,
      children: [
        { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'cart', component: CartComponent },
 
      ]
    }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
