import React, {PropsWithChildren, useEffect} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import tw from 'twrnc';

import {useDispatch, useSelector} from 'react-redux';
import {addCategory, deleteCategory, updateCategory} from '../store/actions';
import {Attribute, AttributeType} from './attribute';
import {useArrayOfObjects} from '../hooks/useArrayOfObjects';
import {CombinedState} from '../store/store';

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: CombinedState) => state.categories);

  useEffect(() => {}, [categories.categories]);
  return (
    <View style={tw` h-full w-full pb-30 flex flex-col`}>
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <View style={tw`flex flex-row justify-end p-4`}>
              <TouchableHighlight
                onPress={() => dispatch(addCategory())}
                style={tw`bg-blue-300 rounded mt-3`}>
                <View style={tw`flex justify-center flex-row items-center p-4`}>
                  <Text>Add Category</Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
          data={categories.categories}
          renderItem={c => (
            <Category
              onChange={cat => {
                dispatch(updateCategory(cat));
              }}
              onDelete={cat => dispatch(deleteCategory(cat))}
              category={c.item}
            />
          )}
        />
      </View>
    </View>
  );
};

export type CategoryType = {
  name: string;
  attributes: AttributeType[];
  title_attribute: string;
  key: number;
};

type CategoryProps = {
  onChange: (attribute: CategoryType) => void;
  onDelete: (attribute: CategoryType) => void;
  category: CategoryType;
};

export const Category: React.FC<PropsWithChildren<CategoryProps>> = ({
  onChange: onCategoryChange,
  onDelete: onCategoryDelete,
  category,
}) => {
  const {
    objects: attributes,
    onAdd,
    onChange,
    onDelete,
  } = useArrayOfObjects<AttributeType>(category.attributes);

  useEffect(() => {
    onCategoryChange({...category, attributes});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

  return (
    <View
      style={tw`flex flex-col bg-white items-stretch p-5 rounded m-3 border-gray-300`}>
      <View style={tw`flex flex-row items-center justify-between mb-5`}>
        <Text style={tw`text-xl font-bold`}>{category.name}</Text>
        <TouchableHighlight
          onPress={() => onCategoryDelete(category)}
          style={tw`bg-red-300 rounded `}>
          <View style={tw`flex justify-center flex-row items-center p-4`}>
            <Text>Remove Category</Text>
          </View>
        </TouchableHighlight>
      </View>

      <TextInput
        placeholder="Category Name"
        style={tw`border border-blue-400 my-3 p-1 text-xl`}
        value={category.name}
        onChangeText={text => {
          onCategoryChange({...category, name: text});
        }}
      />

      <Text style={tw`mt-3 text-lg font-semibold`}>Attributes</Text>
      <AttributeList
        attributesArray={attributes}
        onChange={onChange}
        onDelete={onDelete}
      />
      <TouchableHighlight
        onPress={() => onAdd({name: 'Field', type: 'text'})}
        style={tw`bg-blue-300 rounded mt-3`}>
        <View style={tw`flex justify-center flex-row items-center p-4`}>
          <Text>Add Attrribute</Text>
        </View>
      </TouchableHighlight>

      <SelectDropdown
        buttonStyle={tw`w-auto rounded border-gray-400 border-2 h-12 grow h-8 mt-3`}
        data={attributes.map(a => a.name)}
        defaultValue={category.title_attribute}
        onSelect={_selectedItem => {
          onCategoryChange({...category, title_attribute: _selectedItem});
        }}
        buttonTextAfterSelection={(selectedItem, _index) => {
          return 'Title Field: ' + selectedItem;
        }}
        rowTextForSelection={(item, _index) => {
          return item;
        }}
      />
    </View>
  );
};

const AttributeList: React.FC<{
  attributesArray: AttributeType[];
  onChange: (attribute: AttributeType) => void;
  onDelete: (attribute: AttributeType) => void;
}> = ({attributesArray, onChange, onDelete}) => {
  return (
    <>
      {attributesArray?.map(a => {
        return (
          <Attribute
            onChange={onChange}
            onDelete={onDelete}
            attribute={a}
            key={a.key}
          />
        );
      })}
    </>
  );
};
