import { PropsWithChildren, ReactNode } from 'react';

import { Cell, Row, Header } from './components';
import './styles.css';

type ContainerProps = { header?: ReactNode };

const Container = ({ children, header }: PropsWithChildren<ContainerProps>) => (
  <table className="table">
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
