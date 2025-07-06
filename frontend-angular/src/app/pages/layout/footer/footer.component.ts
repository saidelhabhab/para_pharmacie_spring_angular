import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

 @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleButtonVisibility();
  }

  toggleButtonVisibility() {
    const button = document.querySelector('.top-btn') as HTMLElement;
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}