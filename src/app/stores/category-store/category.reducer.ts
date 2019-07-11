import * as CategoryActions from './category.actions';
import { Category } from './category.model';


export const initialState: Category = {
  id: 'a', 
  name: 'Cell Phones',
  icon: 'robot'
}

export function categoryReducer(state: Category[] = [initialState], action: CategoryActions.CategoryActions) {
  switch (action.type) {
    case CategoryActions.CategoryActionTypes.GET_CATEGORY_SUCCESS:
      return [...action.payload]

    // case CategoryActions.CategoryActionTypes.ADD_CATEGORY:
    //   return [...state, action.payload]
    
    // case CategoryActions.CategoryActionTypes.UPDATE_CATEGORY:
    //   let updatedState = state
    //   updatedState[action.payload.id] = action.payload.id
    //   return [...updatedState]
    
    // case CategoryActions.CategoryActionTypes.DELETE_CATEGORY:
    //   state.splice(action.payload, 1)
    //   return [...state]
    
    default:
      return state
  }
}