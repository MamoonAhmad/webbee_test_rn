import React, {PropsWithChildren} from 'react';
import {Switch, TextInput} from 'react-native';
import tw from 'twrnc';
import DatePicker from 'react-native-date-picker';

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

type FieldType<T> = Omit<DataTypeField<T>, 'type'>;

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
  return (
    <DatePicker
      date={value}
      style={tw`border border-blue-400 my-1 p-1 text-md`}
      onDateChange={onChange}
    />
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
