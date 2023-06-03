import { ReactNode, FC, useCallback } from 'react';
import { Form as FForm, FormRenderProps } from 'react-final-form'

import { EmployeeType } from 'types';
import { mapNewEmployee } from 'utils';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages';

type ErrorsType = Record<keyof EmployeeType | string, string | never>;

type FormProps = {
  onSubmit: (values: EmployeeType) => void,
  children: (form: FormRenderProps<EmployeeType, Partial<EmployeeType>>) => ReactNode,
}

const validate = (values: EmployeeType) => {
  const errors: ErrorsType = {};

  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }

  if (!values.birthday) {
    errors.birthday = 'Required'
  }

  return errors
};

export const Form: FC<FormProps> = ({ onSubmit, children }) => {
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

          <form className="form" onSubmit={(e) => { e.preventDefault(); }}>
            {children(form)}
          </form>
        </>
      )}
    />
  );
};
