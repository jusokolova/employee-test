import { FC } from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type InputType = {
  name: string,
  placeholder?: string,
  label?: string,
  type?: string,
  className?: string,
}

export const Input: FC<InputType> = ({
  className,
  name,
  type,
  placeholder,
  label,
}) => (
  <>
    {label && (
      <label htmlFor={name}>
        {label}
      </label>
    )}
    <Field
      className={cx('input', className)}
      name={name}
      component="input"
      type={type}
      placeholder={placeholder || label}
    />
  </>
);
