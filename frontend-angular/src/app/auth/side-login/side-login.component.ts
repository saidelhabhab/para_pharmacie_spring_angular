import { Component,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './side-login.component.html',
    styleUrl: './side-login.component.scss'

})

export class AppSideLoginComponent{

  constructor(private router: Router,private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginForm: FormGroup;
 
 

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Auth service call goes here
    }
  }

}
