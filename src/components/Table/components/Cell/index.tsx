import { PropsWithChildren } from 'react';

import './styles.css';

export const Cell = ({ children }: PropsWithChildren) => (
  <td className="cell">
    {children}
  </td>
);
