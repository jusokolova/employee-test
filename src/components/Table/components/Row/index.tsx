import { PropsWithChildren } from 'react';

import './styles.css';

export const Row = ({ children }: PropsWithChildren) => (
  <tr className="row">
    {children}
  </tr>
);
