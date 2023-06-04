import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <td className={cx('cell', className)}>
    {children}
  </td>
);
