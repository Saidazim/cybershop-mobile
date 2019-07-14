import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

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
  user: any
  userDoc: AngularFirestoreDocument

  constructor(
    private store: Store<AppState>,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.store.dispatch(new ProductActions.GetProduct())
    
    this.products = this.store.select('product', 'productList')

    this.afAuth.user.subscribe(user => { 
      if (user) {
        this.user = user
        this.userDoc = this.db.collection<any>('users').doc(user.uid)
      }
    })
  }

  public addToFavourites(product: Product) {
    if (this.user) {
      this.userDoc.collection('favorites').add(product)
      console.log('added to fav');
    } else {
      this.router.navigate(['/login'])
    }
  }

}
