import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEditorComponent, NgxEditorModule, NgxEditorMenuComponent } from 'ngx-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AddUserComponent,
    UsersComponent,
    ViewUserComponent,
    EditUserComponent,
    ProductsComponent,
    AddProductComponent,
    ProfileComponent,
    SettingComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxEditorModule,
    NgxEditorComponent, 
    NgxEditorMenuComponent,
    NgSelectModule,
     

    
    
  ]
})
export class AdminModule { }
