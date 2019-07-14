import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppState } from '../stores/app.reducers';
import { CartProduct } from '../stores/cart-store/cart.model';
import * as CartAction from '../stores/cart-store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartList: Observable<CartProduct[]>
  totalSum: Observable<number>
  checkoutProducts: CartProduct[]
  userName: string
  checkoutTotal: number
  value: object
  
  constructor(private store: Store<AppState>,
    public afAuth: AngularFireAuth,) {
    this.cartList = this.store.select('cart', 'products')
    this.totalSum = this.store.select('cart', 'totalSum')
    this.afAuth.user.subscribe(user => {
      if (user && user.displayName) {
        this.userName = user.displayName
      }
     })

    this.totalSum.subscribe(total => this.checkoutTotal = total)
   }

  ngOnInit() {
    this.store.dispatch(new CartAction.GetCartList())
    this.value = {
            products: this.checkoutProducts,
            userName: this.userName,
            total: this.checkoutTotal
          }
  }
  
  public increase(id: string) {
    this.store.dispatch(new CartAction.UpdateProductQuantity({id, action: 'increase'}))
  }

  public decrease(id: string) {
    this.store.dispatch(new CartAction.UpdateProductQuantity({id, action: 'decrease'}))
  }

  public remove(id: string) {
    this.store.dispatch(new CartAction.RemoveFromCart(id))
  }

  clearCart() {
    this.store.dispatch(new CartAction.ClearCart())
  }

}
