import { FC } from 'react';
import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import { editEmployee } from 'store/employee';
import { RootStore } from 'store/reducers';
import { Input } from 'components';
import { SubmitButton } from 'shared';
import { TABLE_HEADERS } from 'utils';

import { Form } from './components';
import './styles.css';

import { validate } from './validate';
import { selectEditData } from 'store/employee';

type EditProps = {
  onSubmit: (employee: Partial<EmployeeType>) => void,
  currentData: EmployeeType | Record<string, never>,
};

const _Edit: FC<EditProps> = ({ currentData, onSubmit }) => (
  <Form initialValues={currentData} validate={validate} onSubmit={onSubmit}>
    {({ handleSubmit, form, invalid }) => (
      <>
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
          disabled={invalid}
          onClick={handleSubmit}
        />
      </>
    )}
  </Form>
);

export const Edit = connect((state: RootStore) => ({
  currentData: selectEditData(state),
}), {
  onSubmit: editEmployee,
})(_Edit);
