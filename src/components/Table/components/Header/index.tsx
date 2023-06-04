import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export const Header = ({ children }: PropsWithChildren) => (
  <th className={cx('header')}>
    {children}
  </th>
);
