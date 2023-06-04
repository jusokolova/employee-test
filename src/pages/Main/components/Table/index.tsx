import React, { FC, PropsWithChildren } from 'react';

import { Sort, Table } from 'components';
import { TABLE_HEADERS } from 'utils';

type TablePropsType = {
  shouldRender: boolean,
};

export const MainTable: FC<PropsWithChildren<TablePropsType>> = ({ shouldRender, children }) => shouldRender ? (
  <Table.Container
    header={Object.entries(TABLE_HEADERS).map(([key, value]) => (
      <Sort key={key} value={value}>
        <Table.Header key={key}>
          {value}
        </Table.Header>
      </Sort>
    ))}
  >
    {children}
  </Table.Container>
) : null;