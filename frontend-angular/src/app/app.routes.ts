import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent} from './pages/blog/blog.component'
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [


  { path: '', component: HomeComponent },  
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detail', component: BlogDetailComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'shop', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },


  
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
        loadChildren: () => import('./auth/authentication.routes').then((m) => m.AuthenticationRoutes ),
   },
  {
    path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule ),
   },
  
  { path: 'error', component: ErrorComponent },


  { path: '**', redirectTo: 'error' }

];



/* {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  }, */
