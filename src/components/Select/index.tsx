import { FC } from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type SelectPropsType = {
  name: string,
  placeholder?: string,
  label?: string,
  className?: string,
  options: string[],
}

export const Select: FC<SelectPropsType> = ({
  className,
  name,
  placeholder,
  label,
  options,
}) => (
  <>
    {label && (
      <label htmlFor={name}>
        {label}
      </label>
    )}
    <Field
      className={cx('select', className)}
      name={name}
      component="select"
      placeholder={placeholder || label}
    >
      {options.map((value) => (
        <option key={value}>
          {value}
        </option>
      ))}
    </Field>
  </>
);