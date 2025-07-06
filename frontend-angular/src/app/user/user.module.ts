import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxEditorComponent, NgxEditorModule, NgxEditorMenuComponent } from 'ngx-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../material.module';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
