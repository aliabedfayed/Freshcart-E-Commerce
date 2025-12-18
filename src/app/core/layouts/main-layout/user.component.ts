import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  goToTop() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  showBtn: boolean = false
  @HostListener("window:scroll") scrollToTop() {
    let scrollTop = document.documentElement.scrollTop

    if (scrollTop > 500) {
      this.showBtn = true
    } else {
      this.showBtn = false
    }
  }
}
