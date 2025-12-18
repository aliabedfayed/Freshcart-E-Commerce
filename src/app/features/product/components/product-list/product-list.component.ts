import { Component, inject, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, SearchPipe, FormsModule, TranslatePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  allProducts: Product[] = []
  searchValue: string = ""
  subscription: Subscription = new Subscription()

  @Input() showSearch: boolean = true;
  @Input() showTitle: boolean = false;


  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly translationService = inject(TranslationService)

  ngOnInit(): void {
    this.getAllProducts()
  }

  showToastr(msg: string) {
    this.toastr.success(msg);
  }

  getAllProducts() {
    this.subscription.add(this.productsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
      }
    }))
  }

  addProductToCart(id: string) {
    this.subscription.add(this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.showToastr("Product added successfully to your cart")
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
