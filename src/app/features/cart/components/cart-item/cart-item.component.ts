import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [TranslatePipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() product: Product = {} as Product
  @Output() removeProduct = new EventEmitter<string>()
  @Output() updateQty = new EventEmitter<{ id: string, newCount: number }>()

  onRemove() {
    this.removeProduct.emit(this.product.product._id)
  }

  onUpdate(newCount: number) {
    this.updateQty.emit({ id: this.product.product._id, newCount })
  }
}
