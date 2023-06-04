import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export const Button = ({ type, children, onClick, className, disabled }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cx('button', className)}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
