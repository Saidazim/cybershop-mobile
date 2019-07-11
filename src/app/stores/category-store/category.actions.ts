import { Action } from '@ngrx/store';
import { Category } from './category.model';


export enum CategoryActionTypes {
  ADD_CATEGORY = '[CATEGORY] Add',
  UPDATE_CATEGORY = '[CATEGORY] Update',
  DELETE_CATEGORY = '[CATEGORY] Delete',
  GET_CATEGORY = '[CATEGORY] Get',
  GET_CATEGORY_SUCCESS = '[CATEGORY] Get Success',
}

export class GetCategory implements Action {
  readonly type = CategoryActionTypes.GET_CATEGORY;
}

export class GetCategorySuccess implements Action {
  readonly type = CategoryActionTypes.GET_CATEGORY_SUCCESS;
  
  constructor(public payload: Category[]) {}
}
export class AddCategory implements Action {
  readonly type = CategoryActionTypes.ADD_CATEGORY

  constructor(public payload: Category) {}
}

export class UpdateCategory implements Action {
  readonly type = CategoryActionTypes.UPDATE_CATEGORY

  constructor(public payload: Category) {}
}

export class DeleteCategory implements Action {
  readonly type = CategoryActionTypes.DELETE_CATEGORY

  constructor(public payload: number) {}
}

export type CategoryActions = AddCategory | UpdateCategory | DeleteCategory | GetCategorySuccess