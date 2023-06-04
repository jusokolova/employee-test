import { FC } from 'react';
import { connect } from 'react-redux';

import type { RootStore } from 'store/reducers';
import type { EmployeeType } from 'types';
import { addEmployee, selectIsLoading } from 'store/employee';
import { Input } from 'components';
import { SubmitButton } from 'shared';
import { TABLE_HEADERS } from 'utils';

import { Form } from './components';

import { validate } from 'pages/Add/validate';

type AddPropsType = { isLoading: boolean, onSubmit: (employee: Partial<EmployeeType>) => void };

const _Add: FC<AddPropsType> = ({ isLoading, onSubmit }) => (
  <Form isLoading={isLoading} validate={validate} onSubmit={onSubmit}>
    {({ handleSubmit, form, invalid }) => (
      <>
        <h1>Добавить сотрудника</h1>

        <Input
          name="firstName"
          label={TABLE_HEADERS.firstName}
        />
        <Input
          name="lastName"
          label={TABLE_HEADERS.lastName}
        />
        <Input
          name="birthday"
          label={TABLE_HEADERS.birthday}
          type="date"
        />
        <Input
          name="height"
          label={TABLE_HEADERS.height}
        />

        <SubmitButton
          disabled={invalid || isLoading}
          onClick={() => {
            handleSubmit()?.then(() => {
              form.reset();
            });
          }}
        />
      </>
    )}
  </Form>
);

export const Add = connect((state: RootStore) => ({
  isLoading: selectIsLoading(state),
}), {
  onSubmit: addEmployee,
})(_Add);
