import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  closeTopbar() {
  const topbar = document.querySelector('.custom-topbar');
  topbar?.classList.add('fade-out');
  setTimeout(() => {
    topbar?.remove();
  }, 500); // wait for animation
}

}
