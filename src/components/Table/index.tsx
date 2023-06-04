import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames/bind';

import { Cell, Row, Header } from './components';

import styles from './styles.css';

const cx = classNames.bind(styles);

type ContainerProps = { header?: ReactNode };

const Container = ({ children, header }: PropsWithChildren<ContainerProps>) => (
  <table className={cx('table')}>
    <thead>
      <Row>
        {header}
      </Row>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
);

export const Table = {
  Container,
  Row,
  Cell,
  Header,
};
