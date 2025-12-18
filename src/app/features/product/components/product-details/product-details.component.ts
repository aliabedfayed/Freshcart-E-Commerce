import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productId!: string | null
  productDetails: Product = {} as Product
  subscription: Subscription = new Subscription()

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toastr = inject(ToastrService)
  private readonly cartService = inject(CartService)

  getProductId() {
    this.subscription.add(this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id')
      }
    }))
  }

  getProductDetails(id: string | null) {
    this.subscription.add(this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails = res.data
      }
    }))
  }

  addToCart() {
    this.subscription.add(this.cartService.addProductToCart(this.productDetails._id).subscribe({
      next: (res) => {
        this.toastr.success("Product added successfully to your cart")
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    }))
  }

  ngOnInit(): void {
    this.getProductId()
    this.getProductDetails(this.productId)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
