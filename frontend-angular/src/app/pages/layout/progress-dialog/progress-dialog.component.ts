import { Component, Input, OnInit,ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-dialog',
    imports:[
          CommonModule,
          MaterialModule,
          FormsModule,
          MatDialogModule,
        ],
  templateUrl: './progress-dialog.component.html',
  styleUrl: './progress-dialog.component.scss'
})
export class ProgressDialogComponent {

}
