import React, {useState} from 'react';
import {Switch, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';
import DatePicker from 'react-native-date-picker';
import {TouchableHighlight} from 'react-native-gesture-handler';

export const DATA_TYPES = {
  text: 'Text',
  date: 'Date',
  number: 'Number',
  checkbox: 'Checkbox',
};

export interface DataTypeField<T> {
  onChange: (v: T) => void;
  value: T;
  type?: 'checkbox' | 'text' | 'number' | 'date';
}

export type FieldType<T> = Omit<DataTypeField<T>, 'type'>;

export const TextField: React.FC<FieldType<string>> = ({onChange, value}) => {
  return (
    <TextInput
      style={tw`border border-blue-400 my-1 p-1 text-md`}
      value={value}
      keyboardType="default"
      onChangeText={t => onChange(t)}
    />
  );
};

export const NumberField: React.FC<FieldType<number>> = ({onChange, value}) => {
  return (
    <TextInput
      value={value?.toString()}
      style={tw`border border-blue-400 my-1 p-1 text-md`}
      keyboardType="decimal-pad"
      onChangeText={t => onChange(parseFloat(t))}
    />
  );
};

export const DateField: React.FC<FieldType<Date>> = ({onChange, value}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View>
        <TouchableHighlight
          onPress={() => setOpen(true)}
          style={tw`border border-blue-400 my-3 p-1 h-10 text-xl flex flex-row items-center justify-center`}>
          <View style={tw`flex justify-center flex-row items-center`}>
            <Text>{new Date(value).toLocaleTimeString()}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <DatePicker
        modal
        open={open}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        date={value ? new Date() : new Date(value)}
        style={tw`border border-blue-400 my-1 p-1 text-md`}
      />
    </>
  );
};

export const CheckboxField: React.FC<FieldType<boolean>> = ({
  onChange,
  value,
}) => {
  return <Switch value={value} onValueChange={v => onChange(v)} />;
};

export type CategoryName = string;
export type ObjectName = string;
export type AttributeName = string;
export type DataTypeInString = 'checkbox' | 'number' | 'date' | 'text';

export type MapStringToType<T> = T extends 'checkbox'
  ? boolean
  : T extends 'text'
  ? string
  : T extends 'number'
  ? number
  : Date;

type ObjectType = {
  title_field: AttributeName;
  attributes: {
    [key: AttributeName]: DataTypeInString;
  };
};

type ObjectValueType = {[key: AttributeName]: any};

export type ObjectStoreInterface = {
  types: {
    [key: CategoryName]: ObjectType;
  };
  values: {
    [key: CategoryName]: {
      [key: ObjectName]: ObjectValueType;
    };
  };
};
