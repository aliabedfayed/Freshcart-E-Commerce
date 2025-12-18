import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../product/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Product } from '../../../product/models/product';
import { ProductCardComponent } from "../../../product/components/product-card/product-card.component";
import { CartService } from '../../../cart/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-category-details',
  imports: [ProductCardComponent, TranslatePipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  categoryId!: string | null
  categoryDetails: Category = {} as Category
  allProducts: Product[] = []
  categoryProducts: Product[] = []
  subscription: Subscription = new Subscription()

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toastr = inject(ToastrService)
  private readonly categoryService = inject(CategoryService)
  private readonly cartService = inject(CartService)

  getCategoryId() {
    this.subscription.add(this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.categoryId = urlData.get('id')
      }
    }))
  }

  getCategoryDetails(id: string | null) {
    this.subscription.add(this.categoryService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.categoryDetails = res.data
      }
    }))
  }

  addToCart(prodId: string) {
    this.subscription.add(this.cartService.addProductToCart(prodId).subscribe({
      next: (res) => {
        this.toastr.success("Product added successfully to your cart")
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    }))
  }

  getAllProducts() {
    this.subscription.add(this.productsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
        this.categoryProducts = this.allProducts.filter((product) => product.category._id === this.categoryId);
      }
    }))
  }

  ngOnInit(): void {
    this.getCategoryId()
    this.getCategoryDetails(this.categoryId)
    this.getAllProducts()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
