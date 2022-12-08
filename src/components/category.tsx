import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {DataTypeInString} from '../utils/data-types';
import SelectDropdown from 'react-native-select-dropdown';
import tw from 'twrnc';

import {useDispatch, useSelector} from 'react-redux';
import {addCategory, deleteCategory, updateCategory} from '../store/store';

type ObjectInArray = {key: string};

type UseArrayOfObjectsType<T extends ObjectInArray> = {
  objects: T[];
  onChange: (obj: T) => void;
  onDelete: (obj: T) => void;
  onAdd: (obj: Omit<T, 'key'>) => void;
  init: (objs: T[]) => void;
};
export const useArrayOfObjects: <T extends ObjectInArray>(
  initialData: ObjectInArray[],
) => UseArrayOfObjectsType<T> = initialData => {
  const [objects, setObjects] = useState<ObjectInArray[]>([]);
  const keyRef = useRef(1);
  const objectsRef = useRef<ObjectInArray[]>(initialData || []);

  useEffect(() => {
    if (objects !== initialData && objectsRef.current === initialData) {
      setObjects(objectsRef.current);
    }
  }, [initialData, objects]);
  const onChange = useCallback((obj: ObjectInArray) => {
    const {key} = obj;
    const attribute: ObjectInArray = objectsRef.current.find(
      a => a.key === key,
    ) as ObjectInArray;
    const index = objectsRef.current.indexOf(attribute);
    objectsRef.current.splice(index, 1, {...attribute, ...obj});
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
    console.log(objectsRef.current);
  }, []);

  const onDelete = useCallback((obj: AttributeType) => {
    const {key} = obj;
    const attribute: ObjectInArray = objectsRef.current.find(
      a => a.key === key,
    ) as ObjectInArray;
    const index = objectsRef.current.indexOf(attribute);
    objectsRef.current.splice(index, 1);
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
  }, []);

  const onAdd = useCallback((obj: ObjectInArray) => {
    objectsRef.current?.push({...obj, key: new Date().getTime().toString()});
    objectsRef.current = [...objectsRef.current];
    setObjects(objectsRef.current);
  }, []);

  const init = useCallback((objs: ObjectInArray[]) => {
    objectsRef.current = [...objs];
    objectsRef.current.forEach(o => (o.key = new Date().getTime().toString()));
    setObjects(objectsRef.current);
  }, []);

  return {objects, onChange, onDelete, onAdd, init};
};

export const Categories = props => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  console.log(categories.categories, 'this is cats');
  useEffect(() => {
    console.log('cats changed');
  }, [categories.categories]);
  return (
    <View style={tw` h-full w-full pb-30`}>
      <View>
        <TouchableHighlight
          onPress={() => dispatch(addCategory())}
          style={tw`bg-blue-300 rounded mt-3`}>
          <View style={tw`flex justify-center flex-row items-center p-4`}>
            <Text>Add Category</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <FlatList
          data={categories.categories}
          renderItem={c => (
            <Category
              onChange={cat => {
                dispatch(updateCategory(cat));
              }}
              onDelete={c => dispatch(deleteCategory(c))}
              category={c.item}
            />
          )}
        />
      </View>
    </View>
  );
};

// const mapStateToProps = state => {
//   const {categories} = state;
//   return categories;
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       addCategory,
//     },
//     dispatch,
//   );

// export const Categories = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(CategoriesScreen);

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
  console.log(category, 'this is category');
  useEffect(() => {
    onCategoryChange({...category, attributes});
  }, [attributes]);

  return (
    <View
      style={tw`flex flex-col bg-white items-stretch p-5 rounded m-3 border-gray-300`}>
      <Text style={tw`text-xl font-bold my-3`}>{category.name}</Text>
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
        // buttonStyle={tw`w-auto rounded border-blue-400 border-2 h-12`}
        onSelect={_selectedItem => {
          onCategoryChange({...category, title_attribute: _selectedItem});
        }}
        buttonTextAfterSelection={(selectedItem, _index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return 'Title Field: ' + selectedItem;
        }}
        rowTextForSelection={(item, _index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />

      <TouchableHighlight
        onPress={() => onCategoryDelete(category)}
        style={tw`bg-red-300 rounded mt-3`}>
        <View style={tw`flex justify-center flex-row items-center p-4`}>
          <Text>Remove Category</Text>
        </View>
      </TouchableHighlight>
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

type AttributeType = {
  key: number;
  name: string;
  type: DataTypeInString;
};

type AttributeProps = {
  onChange: (attribute: AttributeType) => void;
  onDelete: (attribute: AttributeType) => void;
  attribute: AttributeType;
};
export const Attribute: React.FC<AttributeProps> = React.memo(
  ({onChange, attribute, onDelete}) => {
    useEffect(() => {
      console.log('onChange updated');
    }, [onChange]);
    const {name, type} = attribute;
    return (
      <View style={tw`flex flex-row items-center my-3`}>
        <TextInput
          style={tw`w-40 border-gray-400 rounded border h-8 mr-1`}
          value={name}
          onChangeText={t => onChange({...attribute, name: t})}
        />
        <SelectDropdown
          buttonStyle={tw`w-auto rounded border-gray-400 border-2 h-12 grow h-8`}
          data={['checkbox', 'text', 'number', 'date']}
          defaultValue={type}
          // buttonStyle={tw`w-auto rounded border-blue-400 border-2 h-12`}
          onSelect={selectedItem => {
            onChange({...attribute, type: selectedItem});
          }}
          buttonTextAfterSelection={(selectedItem, _index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, _index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <TouchableHighlight
          onPress={() => onDelete(attribute)}
          style={tw`ml-1`}>
          <View>
            <Text style={tw`underline text-blue-400`}>Delete</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
);
