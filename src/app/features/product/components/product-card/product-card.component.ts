import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { StockStatusPipe } from '../../../../shared/pipes/stock-status.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, StockStatusPipe, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private readonly translationService = inject(TranslationService)

  @Input() product!: Product

  @Output()
  addToCart = new EventEmitter<string>()

  onAddToCart() {
    this.addToCart.emit(this.product._id)
  }
}
