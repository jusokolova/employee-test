import classNames from 'classnames/bind';

import styles from './styles.css';
import { FC } from 'react';

const cx = classNames.bind(styles);

type PreloaderPropsType = { className?: string };

export const Preloader: FC<PreloaderPropsType> = ({ className }) => (
  <div className={cx('component', className)}>
    <div className={cx('preloader')} />
  </div>
);