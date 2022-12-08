import React, {useEffect} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import tw from 'twrnc';
import {DataTypeInString} from '../utils/data-types';

export type AttributeType = {
  key: string;
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
