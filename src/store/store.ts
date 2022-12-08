import {combineReducers} from 'redux';

import {CategoryType} from '../components/category';
import {ActionType} from './actions';

export type StoreType = {
  categories: CategoryType[];
  categoryObjects: any[];
};

const INITIAL_STATE: StoreType = {
  categories: [],
  categoryObjects: [],
};

const categoryReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload as CategoryType],
      };
    case 'UPDATE_CATEGORY': {
      const cat = state.categories.find(
        c => c.key === action.payload.key,
      ) as CategoryType;
      const index = state.categories.indexOf(cat);
      state.categories.splice(index, 1, action.payload);
      return {
        ...state,
        categories: [...state.categories],
      };
    }
    case 'DELETE_CATEGORY': {
      const cat = state.categories.find(
        c => c.key === action.payload.key,
      ) as CategoryType;
      const index = state.categories.indexOf(cat);
      state.categories.splice(index, 1);
      return {
        ...state,
        categories: [...state.categories],
      };
    }
    default:
      return state;
  }
};

export const categoryObjectReducer = (
  state = INITIAL_STATE,
  action: ActionType,
) => {
  switch (action.type) {
    case 'ADD_CATEGORY_OBJECT':
      return {
        ...state,
        categoryObjects: [...state.categoryObjects, action.payload],
      };
    case 'UPDATE_CATEGORY_OBJECT': {
      const cat = state.categoryObjects.find(
        c => c.key === action.payload.key,
      ) as any;
      const index = state.categories.indexOf(cat);
      state.categoryObjects.splice(index, 1, action.payload);
      return {
        ...state,
        categoryObjects: [...state.categoryObjects],
      };
    }
    case 'DELETE_CATEGORY_OBJECT': {
      const cat = state.categoryObjects.find(
        c => c.key === action.payload.key,
      ) as any;
      const index = state.categories.indexOf(cat);
      state.categoryObjects.splice(index, 1);
      return {
        ...state,
        categoryObjects: [...state.categoryObjects],
      };
    }
    default:
      return state;
  }
};

export const categoryReducers = combineReducers({
  categories: categoryReducer,
  categoryObject: categoryObjectReducer,
});

export type CombinedState = ReturnType<typeof categoryReducers>;
