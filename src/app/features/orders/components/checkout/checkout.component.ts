import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  isLoading: boolean = true
  resMsg: string = ""
  checkoutForm!: FormGroup
  cartId!: string
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly order = inject(OrderService)


  formInit() {
    this.checkoutForm = this.fb.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

  getCartId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.cartId = urlData.get('id')!
      }
    })
  }

  submitForm() {
    this.isLoading = false
    if (this.checkoutForm.valid || !this.isLoading) {
      this.order.createCheckout(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.isLoading = true
          open(res.session.url, "_self")
        }
      })
    }
  }

  ngOnInit(): void {
    this.formInit()
    this.getCartId()
  }
}
