import { FC, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type ButtonsGroupPropsType = {
  mainButton: ReactNode,
  secondaryButton?: ReactNode,
  altButton?: ReactNode,
};

export const ButtonsGroup: FC<ButtonsGroupPropsType> = ({ mainButton, secondaryButton, altButton }) => (
  <div className={cx('container')}>
    <div className={cx('button-item')}>
      {mainButton}
    </div>

    {secondaryButton && (
      <div className={cx('button-item')}>
        {secondaryButton}
      </div>
    )}

    {altButton && (
      <div className={cx('button-item')}>
        {altButton}
      </div>
    )}
  </div>
)