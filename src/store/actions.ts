import {CategoryType} from '../components/category';

export type ActionType = {
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

export const addCategoryObject = (cat: CategoryType) => {
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
