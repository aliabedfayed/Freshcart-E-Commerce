import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }


  createCheckout(cartId: string | null, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    const returnUrl = "?url=https://melodic-muffin-65d85e.netlify.app"

    return this.httpClient.post(environments.baseUrl + "orders/checkout-session/" + cartId + returnUrl, {
      shippingAddress
    })
  }
}
