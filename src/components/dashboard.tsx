import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {CategoryObjectsView} from './category-objects';
import tw from 'twrnc';
import {CombinedState} from '../store/store';

export const Dashboard = () => {
  const categories = useSelector((state: CombinedState) => state.categories);
  console.log(categories, 'this is dashboard');
  return (
    <View style={tw`flex-1`}>
      {categories?.categories?.map(c => (
        <CategoryObjectsView name={c.name} />
      ))}
    </View>
  );
};
