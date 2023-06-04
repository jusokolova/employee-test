import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export const Header = ({ children, onClick }: PropsWithChildren) => (
  <th className={cx('header')} onClick={onClick}>
    {children}
  </th>
);
