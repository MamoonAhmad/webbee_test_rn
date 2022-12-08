import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {CategoryType} from '../components/category';

type StoreType = {
  categories: CategoryType[];
  categoryObjects: any[];
};

const INITIAL_STATE: StoreType = {
  categories: [],
  categoryObjects: [],
};

type ActionType = {
  type:
    | 'ADD_ATTRIBUTE'
    | 'ADD_CATEGORY'
    | 'UPDATE_CATEGORY'
    | 'DELETE_CATEGORY'
    | 'ADD_CATEGORY_OBJECT'
    | 'UPDATE_CATEGORY_OBJECT'
    | 'DELETE_CATEGORY_OBJECT';
  payload: any;
};

const categoryReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      Alert.alert('I am here in this');
      //   state.categories.push(action.payload as CategoryType);
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

export const categoryObjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY_OBJECT':
      Alert.alert('I am here in this');

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

export const addCategory = (): ActionType => {
  return {
    type: 'ADD_CATEGORY',
    payload: {
      name: 'Category' + new Date().getTime().toString(),
      key: new Date().getTime().toString(),
      attributes: [
        {
          key: new Date().getTime().toString(),
          name: 'Category' + new Date().getTime().toString(),
          type: 'text',
        },
      ],
      title_attribute: 'Field',
    },
  };
};
export const updateCategory = (cat: CategoryType): ActionType => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: cat,
  };
};

export const deleteCategory = (cat: CategoryType): ActionType => {
  return {
    type: 'DELETE_CATEGORY',
    payload: cat,
  };
};

export const addCategoryObject = (cat: any) => {
  const newObject: any = {
    key: new Date().getTime().toString(),
    category: cat.name,
    value: {},
  };
  cat?.attributes.forEach(a => {
    newObject.value[a.name] = null;
  });
  return {
    type: 'ADD_CATEGORY_OBJECT',
    payload: newObject,
  };
};

export const updateCategoryObject = (obj: any) => {
  return {
    type: 'UPDATE_CATEGORY_OBJECT',
    payload: obj,
  };
};

export const deleteCategoryObject = (obj: any) => {
  return {
    type: 'DELETE_CATEGORY_OBJECT',
    payload: obj,
  };
};

const persistConfig = {
  key: 'categories',
  storage: AsyncStorage,
  whitelist: ['categories'],
  stateReconciler: autoMergeLevel2,
};
export const categoryReducers = combineReducers({
  categories: categoryReducer,
  categoryObject: categoryObjectReducer,
});
