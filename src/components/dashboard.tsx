import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {CategoryObjectsView} from './category-objects';
import tw from 'twrnc';

export const Dashboard = () => {
  const categories = useSelector(state => state.categories);
  console.log(categories, 'this is dashboard');
  return (
    <View style={tw`flex-1`}>
      {categories?.categories?.map(c => (
        <CategoryObjectsView name={c.name} />
      ))}
    </View>
  );
};
