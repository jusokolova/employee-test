import { FC } from 'react';
import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import { editEmployee, selectIsLoading } from 'store/employee';
import { RootStore } from 'store/reducers';
import { Input } from 'components';
import { SubmitButton } from 'shared';
import { TABLE_HEADERS } from 'utils';

import { Form } from './components';

import { validate } from './validate';
import { selectEditData } from 'store/employee';

type EditProps = {
  isLoading: boolean,
  onSubmit: (employee: Partial<EmployeeType>) => void,
  currentData: EmployeeType | Record<string, never>,
};

const _Edit: FC<EditProps> = ({ isLoading, currentData, onSubmit }) => (
  <Form
    isLoading={isLoading}
    initialValues={currentData}
    validate={validate}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, form, invalid }) => (
      <>
        <h1>Редактировать сотрудника</h1>

        <Input
          name="employeeId"
          label={TABLE_HEADERS.employeeId}
        />
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
          onClick={handleSubmit}
        />
      </>
    )}
  </Form>
);

export const Edit = connect((state: RootStore) => ({
  currentData: selectEditData(state),
  isLoading: selectIsLoading(state),
}), {
  onSubmit: editEmployee,
})(_Edit);
