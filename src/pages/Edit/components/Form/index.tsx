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
  initialValues: Record<string, any>
  validate: (values: Partial<EmployeeType>) => ErrorsType,
  onSubmit: (values: Partial<EmployeeType>) => void,
  children: (form: FormRenderProps<EmployeeType, Partial<EmployeeType>>) => ReactNode,
}

export const Form: FC<FormProps> = ({ initialValues, validate, onSubmit, children }) => {
  const navigate = useNavigate();
  const returnToMain = useCallback(() => {
    navigate(ROUTES.MAIN);
  }, []);

  return  (
    <FForm
      initialValues={initialValues}
      onSubmit={(values: EmployeeType) => onSubmit(mapNewEmployee(values))}
      validate={validate}
      render={(form) => (
        <>
          <Button onClick={returnToMain}>
            На главную
          </Button>

          <form className={cx('edit-form')} onSubmit={(e) => { e.preventDefault(); }}>
            {children(form)}
          </form>
        </>
      )}
    />
  );
};
