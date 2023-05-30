import { ButtonHTMLAttributes } from 'react';

import './styles.css';

export const Button = ({ type, children, onClick }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="button" type={type} onClick={onClick}>
    {children}
  </button>
);
