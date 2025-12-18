import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink, TranslatePipe],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit, OnDestroy {
  cartDetails: Cart = {} as Cart
  isLoading: boolean = false
  subscription: Subscription = new Subscription()

  private readonly cartService = inject(CartService)

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart() {
    this.subscription.add(this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res
        this.isLoading = true
      }
    }))
  }

  removeProduct(id: string) {
    this.subscription.add(this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    }))
  }

  updateQuantity(id: string, count: number) {
    this.subscription.add(this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    }))
  }

  clearCart() {
    this.subscription.add(this.cartService.clearUserCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.loadCart()
          this.cartService.cartCounter.set(res.numOfCartItems || 0)
        }
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
