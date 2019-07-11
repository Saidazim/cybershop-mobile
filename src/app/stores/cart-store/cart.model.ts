import { Product } from '../product-store/product.model';

export interface CartProduct{
  product: Product;
  quantity?: number;
}

export interface CartState{
  products: CartProduct[];
  productsCount: number;
  totalSum: number;
}