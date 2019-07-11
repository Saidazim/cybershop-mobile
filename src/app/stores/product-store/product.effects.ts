import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as ProductActions from '../product-store/product.actions';
import { Product } from './product.model';

@Injectable()
export class ProductEffects {

  products: AngularFirestoreCollection = this.db.collection<Product[]>('products')

  @Effect()
  getProducts$ = this.actions$
    .pipe(
      ofType(ProductActions.ProductActionTypes.GET_PRODUCT),
      switchMap(() =>  this.products.snapshotChanges().pipe(
        map(products => products.map(product => {
          const data = product.payload.doc.data() as Product[];
          const id = product.payload.doc.id;
          return { id, ...data };
        }))
      )
        .pipe(
          map(products => ({ type: '[PRODUCT] Get Success', payload: products })),
          catchError(() => EMPTY)
        ))
      )
      
  @Effect({ dispatch: false })
  addProduct$ = this.actions$
    .pipe(
      ofType<ProductActions.AddProduct>(ProductActions.ProductActionTypes.ADD_PRODUCT),
      map((action) => action.payload),
      tap(product => this.products.add(product)),
      catchError(() => EMPTY)
    )
        
  @Effect({ dispatch: false })
  updateProduct$ = this.actions$
    .pipe(
      ofType<ProductActions.UpdateProduct>(ProductActions.ProductActionTypes.UPDATE_PRODUCT),
      map((action) => action.payload),
      tap(product => this.db.doc(`products/${product.id}`).update(product)),
      catchError(() => EMPTY)
    )
        
  @Effect({ dispatch: false })
  deleteProduct$ = this.actions$
    .pipe(
      ofType<ProductActions.DeleteProduct>(ProductActions.ProductActionTypes.DELETE_PRODUCT),
      map((action) => action.payload),
      tap(id => this.db.doc(`products/${id}`).delete()),
      catchError(() => EMPTY)
    )

  constructor(
    private db: AngularFirestore,
    private actions$: Actions,
  ) {}
}