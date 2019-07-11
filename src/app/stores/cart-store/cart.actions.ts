import { Action } from '@ngrx/store';
import { CartProduct } from './cart.model';


export enum CartActionTypes {
  GET_CART_LIST = '[CART] Get',
  ADD_TO_CART = '[CART] Add',
  REMOVE_FROM_CART = '[CART] Remove',
  UPDATE_PRODUCT_QUANTITY = '[CART] Update product quantity',
  CLEAR_CART = '[CART] Clear',
}

export class GetCartList implements Action {
  readonly type = CartActionTypes.GET_CART_LIST
}

export class AddToCart implements Action {
  readonly type = CartActionTypes.ADD_TO_CART

  constructor(public payload: CartProduct) {    
  }
}

export class RemoveFromCart implements Action {
  readonly type = CartActionTypes.REMOVE_FROM_CART

  constructor(public payload: string) {    
  }
}

export class UpdateProductQuantity implements Action {
  readonly type = CartActionTypes.UPDATE_PRODUCT_QUANTITY

  constructor(public payload: { id: string, action: string }) {    
  }
}

export class ClearCart implements Action {
  readonly type = CartActionTypes.CLEAR_CART
}


export type CartActions = GetCartList | AddToCart | RemoveFromCart | UpdateProductQuantity | ClearCart