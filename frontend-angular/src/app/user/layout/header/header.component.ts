import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MaterialModule } from 'src/app/material.module';


@Component({
  selector: 'app-header',
  imports: [
      RouterModule,
      CommonModule,
      NgScrollbarModule,
      TablerIconsModule,
      MaterialModule,
      MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
    encapsulation: ViewEncapsulation.None,
  
})
export class HeaderComponent {

 @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
}