import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export const Row = ({ children }: PropsWithChildren) => (
  <tr className={cx('row')}>
    {children}
  </tr>
);
