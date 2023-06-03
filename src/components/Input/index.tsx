import { FC } from 'react';
import { Field } from 'react-final-form';

type InputType = {
  name: string,
  placeholder?: string,
  label?: string,
  type?: string,
}

export const Input: FC<InputType> = ({ name, type, placeholder, label }) => (
  <>
    {label && (
      <label htmlFor={name}>
        {label}
      </label>
    )}
    <Field name={name} component="input" type={type} placeholder={placeholder || name} />
  </>
);
