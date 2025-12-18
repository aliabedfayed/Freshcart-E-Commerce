import { Component, computed, inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() layout!: string

  navbarCounter = computed(() => this.cartService.cartCounter())
  subscription: Subscription = new Subscription()

  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly translationService = inject(TranslationService)

  private readonly id = inject(PLATFORM_ID)

  lang: string = "en"
  isOpen: boolean = false

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      this.lang = localStorage.getItem("lang") ?? 'en'
    }

    if (isPlatformBrowser(this.id)) {
      this.subscription = this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartService.cartCounter.set(res.numOfCartItems)
        }
      })
    }
  }

  selectedLang(lang: string) {
    this.translationService.changeLang(lang);
    this.lang = lang;

    this.isOpen = false
  }


  logout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
