import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-topstrip',
  imports: [TablerIconsModule,MaterialModule],
  templateUrl: './topstrip.component.html',
  styleUrl: './topstrip.component.scss'
})
export class TopstripComponent {

}
