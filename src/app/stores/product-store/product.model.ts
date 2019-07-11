export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  category: string;
}

export interface ProductState {
  productList: Product[];
  filteredProducts: Product[];
}
