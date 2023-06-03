import React, { FC, PropsWithChildren } from 'react';

import { Table } from 'components';
import { TABLE_HEADERS } from 'utils';

type TablePropsType = {
  shouldRender: boolean,
};

export const MainTable: FC<PropsWithChildren<TablePropsType>> = ({ shouldRender, children }) => shouldRender ? (
  <Table.Container
    header={Object.entries(TABLE_HEADERS).map(([key, value]) => (
      <Table.Header key={key}>
        {value}
      </Table.Header>
    ))}
  >
    {children}
  </Table.Container>
) : null;