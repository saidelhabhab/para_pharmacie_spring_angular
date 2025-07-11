import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {

}
