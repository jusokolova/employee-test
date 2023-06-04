import { ReactNode, FC } from 'react';
import { Form as FForm, FormRenderProps } from 'react-final-form'
import classNames from 'classnames/bind';

import type { EmployeeType } from 'types';

import styles from './styles.css';

const cx = classNames.bind(styles);

type FilterFormProps = {
  onSubmit: (values: EmployeeType) => void,
  children: (form: FormRenderProps<EmployeeType, Partial<EmployeeType>>) => ReactNode,
}

export const FilterForm: FC<FilterFormProps> = ({ onSubmit, children }) => {
  return  (
    <FForm
      onSubmit={onSubmit}
      render={(form) => (
        <form
          className={cx('filter-form')}
          onSubmit={(e) => { e.preventDefault(); }}
        >
          {children(form)}
        </form>
      )}
    />
  );
};
