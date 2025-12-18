import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cartCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCounter: WritableSignal<number> = signal<number>(0)

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'cart', {
      productId
    })
  }

  updateCartQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(environments.baseUrl + 'cart/' + productId, {
      count
    })
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environments.baseUrl + "cart")
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(environments.baseUrl + "cart/" + productId)
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(environments.baseUrl + "cart")
  }
}
