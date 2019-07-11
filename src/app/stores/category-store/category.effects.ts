import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as CategoryActions from '../category-store/category.actions';
import { Category } from './category.model';

@Injectable()
export class CategoryEffects {

  categories: AngularFirestoreCollection = this.db.collection<Category[]>('categories')

  @Effect()
  getCategories$ = this.actions$
    .pipe(
      ofType(CategoryActions.CategoryActionTypes.GET_CATEGORY),
      switchMap(() => this.db.collection<Category[]>('categories').snapshotChanges().pipe(
        map(categories => categories.map(category => {
          const data = category.payload.doc.data() as Category[];
          const id = category.payload.doc.id;
          return { id, ...data };
        }))
      )
        .pipe(
          map(categories => ({ type: '[CATEGORY] Get Success', payload: categories })),
          catchError(() => EMPTY)
        ))
      )
      
  @Effect({ dispatch: false })
  addCategoryt$ = this.actions$
    .pipe(
      ofType<CategoryActions.AddCategory>(CategoryActions.CategoryActionTypes.ADD_CATEGORY),
      map((action) => action.payload),
      tap(category => this.categories.add(category)),
      catchError(() => EMPTY)
    )
        
  @Effect({ dispatch: false })
  updateCategory$ = this.actions$
    .pipe(
      ofType<CategoryActions.UpdateCategory>(CategoryActions.CategoryActionTypes.UPDATE_CATEGORY),
      map((action) => action.payload),
      tap(category => this.db.doc(`categories/${category.id}`).update(category)),
      catchError(() => EMPTY)
    )
        
  @Effect({ dispatch: false })
  deleteCategory$ = this.actions$
    .pipe(
      ofType<CategoryActions.DeleteCategory>(CategoryActions.CategoryActionTypes.DELETE_CATEGORY),
      map((action) => action.payload),
      tap(id => this.db.doc(`categories/${id}`).delete()),
      catchError(() => EMPTY)
    )

  constructor(
    private db: AngularFirestore,
    private actions$: Actions,
  ) {}
}