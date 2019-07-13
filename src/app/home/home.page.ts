import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../stores/product-store/product.model';
import * as ProductActions from '../stores/product-store/product.actions';
import { AppState } from '../stores/app.reducers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  products: Observable<Product[]>

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(new ProductActions.GetProduct())
    
    this.products = this.store.select('product', 'productList')
  }

}
