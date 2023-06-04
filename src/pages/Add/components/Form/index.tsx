import { ReactNode, FC, useCallback } from 'react';
import { Form as FForm, FormRenderProps } from 'react-final-form'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import type { EmployeeType } from 'types';
import { mapNewEmployee } from 'utils';
import { Button } from 'components';
import { ROUTES } from 'pages';

import type { ErrorsType } from '../../validate';
import styles from './styles.css';

const cx = classNames.bind(styles);

type FormProps = {
  validate: (values: EmployeeType) => ErrorsType,
  onSubmit: (values: EmployeeType) => void,
  children: (form: FormRenderProps<EmployeeType, Partial<EmployeeType>>) => ReactNode,
}

export const Form: FC<FormProps> = ({ validate, onSubmit, children }) => {
  const navigate = useNavigate();
  const returnToMain = useCallback(() => {
    navigate(ROUTES.MAIN);
  }, []);

  return  (
    <FForm
      onSubmit={(values: EmployeeType) => onSubmit(mapNewEmployee(values))}
      validate={validate}
      render={(form) => (
        <>
          <Button onClick={returnToMain}>
            На главную
          </Button>

          <form
            className={cx('add-form')}
            onSubmit={(e) => { e.preventDefault(); }}
          >
            {children(form)}
          </form>
        </>
      )}
    />
  );
};
