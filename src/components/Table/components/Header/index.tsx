import { PropsWithChildren } from 'react';

import './styles.css';

export const Header = ({ children }: PropsWithChildren) => (
  <th className="header">
    {children}
  </th>
);
