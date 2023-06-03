import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import { addEmployee } from 'store/employee';
import { Input } from 'components';
import { SubmitButton } from 'shared';
import { TABLE_HEADERS } from 'utils';

import { Form } from './components';
import './styles.css';

import { validate } from 'pages/Add/validate';

const _Add = ({ onSubmit }: { onSubmit: (employee: EmployeeType) => void }) => {
  return (
    <Form validate={validate} onSubmit={onSubmit}>
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
