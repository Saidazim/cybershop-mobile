import { Product, ProductState } from './product.model';
import * as ProductActions from './product.actions';


export const initialState: ProductState = {
  productList: null,
  filteredProducts: null,
}

export function productReducer(state: ProductState = initialState, action: ProductActions.ProductActions): ProductState {
  switch (action.type) {
    case ProductActions.ProductActionTypes.GET_PRODUCT_SUCCESS: 
      return { ...state, productList: action.payload, filteredProducts: action.payload }
    
    case ProductActions.ProductActionTypes.FILTER_PRODUCT: {
      return {
        ...state,
        filteredProducts: filterProducts(state.productList, action.payload)
      }
    }
    
    default:
      return state
  }
}

function filterProducts(products: Product[], payload: string) {
  return products.filter((product) => product.name.toLowerCase().includes(payload.toLowerCase()))
}