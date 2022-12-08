import React from 'react';
import {Field} from './data-types';

export const some = () => {
  return (
    <Field
      value={1}
      onChange={(e: number) => {
        e.toString();
      }}
      type="number"
    />
  );
};
