import * as CartActions from './cart.actions';
import { CartState, CartProduct } from './cart.model';


export const initialState: CartState = {
  products: null,
  productsCount: null,
  totalSum: null,
}

export function cartReducer(state: CartState = initialState, action: CartActions.CartActions): CartState {
  switch (action.type) {
    case CartActions.CartActionTypes.GET_CART_LIST_SUCCESS: {
      const cartList: CartProduct[] = action.payload
      let productsCount: number = 0
      let totalSum: number = 0

      cartList.forEach(item => {
        productsCount += item.quantity
        totalSum = totalSum + (item.product.price * item.quantity)
      })

      return { products: cartList, productsCount, totalSum }
    }
      
    default:
      return state
  }
}