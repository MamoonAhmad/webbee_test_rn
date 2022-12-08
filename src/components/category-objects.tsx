import React, {useContext} from 'react';
import {Context} from '../context/context';
import {useArrayOfObjects} from './category';
import tw from 'twrnc';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {
  CheckboxField,
  DataTypeInString,
  DateField,
  NumberField,
  TextField,
} from '../utils/data-types';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategoryObject,
  deleteCategoryObject,
  updateCategoryObject,
} from '../store/store';

type Props = {name: string};
export const CategoryObjectsView: React.FC<Props> = ({name}) => {
  // const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const objects = useSelector(state => state.categoryObject);
  const dispatch = useDispatch();
  console.log(objects, 'this is obj');

  return (
    <View style={tw`w-full flex flex-col p-2`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-xl text-black font-bold`}>{name}</Text>
        <View>
          <TouchableHighlight
            onPress={() => {
              const obj = categories.categories.find(o => o?.name === name);
              dispatch(addCategoryObject(obj));
            }}
            style={tw`bg-blue-300 rounded mt-3`}>
            <View style={tw`flex justify-center flex-row items-center p-4`}>
              <Text>Add Category {name}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <View>
        {objects.categoryObjects
          ?.filter(o => o.category === name)
          ?.map(o => (
            <ObjectView
              onChange={co => dispatch(updateCategoryObject(co))}
              onDelete={co => dispatch(deleteCategoryObject(co))}
              object={o}
            />
          ))}
      </View>
    </View>
  );
};

type ObjectType = {
  value: {[key: string]: any};
  key: number;
};
type P = {
  onChange: (attribute: ObjectType) => void;
  onDelete: (attribute: ObjectType) => void;
  object: ObjectType;
};

const getComponentForDataType: (t: DataTypeInString) => React.FC = t => {
  if (t === 'checkbox') {
    return CheckboxField;
  } else if (t === 'date') {
    return DateField;
  } else if (t === 'number') {
    return NumberField;
  } else if (t === 'text') {
    return TextField;
  }
};

const ObjectView: React.FC<P> = ({onChange, object, onDelete}) => {
  console.log(object, 'this is object');
  return (
    <View
      style={tw`flex flex-col bg-white border rounder m-3 border-gray-400 p-3`}>
      {Object.keys(object.value).map(name => {
        return (
          <View style={tw`flex mt-3`}>
            <Text style={tw`text-md font-semibold text-black my-1`}>
              {name}
            </Text>
            <Field
              object={object}
              name={name}
              onChange={onChange}
              type="text"
            />
          </View>
        );
      })}

      <View>
        <TouchableHighlight
          onPress={() => {
            onDelete(object);
          }}
          style={tw`bg-red-300 rounded mt-3`}>
          <View style={tw`flex justify-center flex-row items-center p-4`}>
            <Text>Remove</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const Field: React.FC<{
  name: string;
  onChange: (attribute: ObjectType) => void;
  type: DataTypeInString;
  object: ObjectType;
}> = ({name, onChange, type, object}) => {
  const Comp = getComponentForDataType(type);

  return (
    <Comp
      onChange={(t: any) =>
        onChange({...object, value: {...object.value, [name]: t}})
      }
    />
  );
};
