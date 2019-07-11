import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {

  cartProducts = from(this.storage.get('cart'))

  @Effect()
  getCartList$ = this.actions$
    .pipe(
      ofType<CartActions.GetCartList>(CartActions.CartActionTypes.GET_CART_LIST),
      switchMap(() =>  from(this.storage.get('cart')).pipe(
        map(products => products),
        map(products => ({ type: '[CART] Get Success', payload: products || [] })),
        catchError(() => EMPTY))
      ))
      
  @Effect()
  addToCart$ = this.actions$
    .pipe(
      ofType<CartActions.AddToCart>(CartActions.CartActionTypes.ADD_TO_CART),
      map((action) => action.payload),
      switchMap(cartProduct => from(this.storage.get('cart')).pipe(
        map((cartProducts) => cartProducts || []),
        map((cartProducts) => {          
          const index = cartProducts.findIndex(item => {
            return item.product.id === cartProduct.product.id
          })
          if (index === -1) {
            cartProduct.quantity = 1
            
            cartProducts.push(cartProduct)
          } else {
            cartProducts[index].quantity += 1
          }
          return cartProducts
        }),
        switchMap((products) => from(this.storage.set('cart', products)).pipe(map(() => products))),
        )),
      map(products => ({ type: '[CART] Get Success', payload: products || [] })),
      catchError(() => EMPTY)
  )
  
  @Effect()
  removeFromCart$ = this.actions$
    .pipe(
      ofType<CartActions.RemoveFromCart>(CartActions.CartActionTypes.REMOVE_FROM_CART),
      map((action) => action.payload),
      switchMap(cartProductId => from(this.storage.get('cart')).pipe(
        map((cartProducts) => cartProducts || []),
        map((cartProducts) => cartProducts.filter(item => item.product.id !== cartProductId)),
        switchMap((products) => from(this.storage.set('cart', products)).pipe(map(() => products))),
        map(products => ({ type: '[CART] Get Success', payload: products || [] })),
        catchError(() => EMPTY)
      )),
  )
  
  @Effect()
  clearCart$ = this.actions$
    .pipe(
      ofType<CartActions.ClearCart>(CartActions.CartActionTypes.CLEAR_CART),
      switchMap(() => from(this.storage.get('cart')).pipe(
        switchMap((products) => from(this.storage.remove('cart')).pipe(map(() => []))),
        map(products => ({ type: '[CART] Get Success', payload: products || [] })),
        catchError(() => EMPTY)
      )),
  )
  
  @Effect()
  updateProductQuantity$ = this.actions$
  .pipe(
    ofType<CartActions.UpdateProductQuantity>(CartActions.CartActionTypes.UPDATE_PRODUCT_QUANTITY),
    map((action) => action.payload),
    switchMap(cartObject => from(this.storage.get('cart')).pipe(
      map((cartProducts) => {
        let newCartProducts = cartProducts.map(item => {
          if (item.product.id === cartObject.id && cartObject.action === 'increase') {
            item.quantity += 1
          } else if (item.product.id === cartObject.id && cartObject.action === 'decrease') {
            item.quantity -= 1
          }
  
          if (item.quantity < 1) {
            item.quantity = 1
          }
          
          return item
        });
        return newCartProducts
      }),
      switchMap((products) => from(this.storage.set('cart', products)).pipe(map(() => products))),
      map(products => ({ type: '[CART] Get Success', payload: products || [] })),
      catchError(() => EMPTY)
    )),
    )

  constructor(
    private actions$: Actions,
    private storage: Storage,
  ) {}
}