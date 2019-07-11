import { ActionReducerMap } from '@ngrx/store';

import { ProductState } from './product-store/product.model';
import { Category } from './category-store/category.model';
import { productReducer } from './product-store/product.reducer';
import { categoryReducer } from './category-store/category.reducer';
import { CartState } from './cart-store/cart.model';
import { cartReducer } from './cart-store/cart.reducer';

export interface AppState {
  readonly product: ProductState;
  readonly category: Category[];
  readonly cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
};