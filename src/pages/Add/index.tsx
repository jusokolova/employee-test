import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import { addEmployee } from 'store/employee/actions';
import { Input } from 'components';
import { TABLE_HEADERS } from 'utils';

import { SubmitButton, Form } from './components';
import './styles.css';

const _Add = ({ onSubmit }: { onSubmit: (employee: EmployeeType) => void }) => {
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form, invalid }) => (
        <>
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
};

export const Add = connect(null, {
  onSubmit: addEmployee,
})(_Add);
