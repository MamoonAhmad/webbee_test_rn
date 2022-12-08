import React, {PropsWithChildren, useState} from 'react';
import {CategoryType} from '../components/category';

export const Context = React.createContext<{
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
}>({categories: [], setCategories: () => {}});

export const ContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  return (
    <Context.Provider value={{categories, setCategories}}>
      {children}
    </Context.Provider>
  );
};
