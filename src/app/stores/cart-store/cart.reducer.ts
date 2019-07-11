import * as CartActions from './cart.actions';
import { CartState, CartProduct } from './cart.model';


export const initialState: CartState = {
  products: null,
  productsCount: null,
  totalSum: null,
}

export function cartReducer(state: CartState = initialState, action: CartActions.CartActions): CartState {
  switch (action.type) {
    case CartActions.CartActionTypes.GET_CART_LIST: {
      const cartList: CartProduct[] = JSON.parse(localStorage.getItem('cartList')) || []
      let productsCount: number = 0
      let totalSum: number = 0

      cartList.forEach(item => {
        productsCount += item.quantity
        totalSum = totalSum + (item.product.price * item.quantity)
      })

      return { products: cartList, productsCount, totalSum }
    }
      
      
    case CartActions.CartActionTypes.ADD_TO_CART: {
      let productsCount: number = 0
      let totalSum: number = 0
      let products = state.products
      
      const index = products.findIndex(item => {
        return item.product.id === action.payload.product.id
      })

      if (index === -1) {
        let cartProduct = action.payload
        cartProduct.quantity = 1

        products.push(cartProduct)
      } else {
        products[index].quantity += 1
      }
      
      products.forEach(item => {
        productsCount += item.quantity
        totalSum = totalSum + (item.product.price * item.quantity)
      })
      localStorage.setItem('cartList', JSON.stringify(products))

      return { products, productsCount, totalSum }
    }
    
    case CartActions.CartActionTypes.REMOVE_FROM_CART: {
      let products = state.products.filter(item => item.product.id !== action.payload)
      let productsCount: number = 0
      let totalSum: number = 0

      localStorage.setItem('cartList', JSON.stringify(products))

      products.forEach(item => {
        productsCount += item.quantity
        totalSum = totalSum + (item.product.price * item.quantity)
      })

      return { products, productsCount, totalSum }
    }
    
    case CartActions.CartActionTypes.UPDATE_PRODUCT_QUANTITY: {
      let productsCount: number = 0
      let totalSum: number = 0
      let payload = action.payload
      let products: CartProduct[] = state.products.map(item => {
        
        if (item.product.id === payload.id && payload.action === 'increase') {
          item.quantity += 1
        } else if (item.product.id === payload.id && payload.action === 'decrease') {
          item.quantity -= 1
        }

        if (item.quantity < 1) {
          item.quantity = 1
        }

        productsCount += item.quantity
        totalSum = totalSum + (item.product.price * item.quantity)
        return item
      })

      localStorage.setItem('cartList', JSON.stringify(products))

      return { products, productsCount, totalSum }
    }
      
      
    case CartActions.CartActionTypes.CLEAR_CART: {
      localStorage.clear()

      return { products: [], productsCount: 0, totalSum:0 }
    }
    
    default:
      return state
  }
}