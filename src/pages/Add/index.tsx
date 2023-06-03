import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form'

import { addEmployee } from 'store/employee/actions';
import { Button, Input } from 'components';
import { ROUTES } from 'pages';
import { TABLE_HEADERS } from 'utils';

import './styles.css';

const _Add = ({ onSubmit }) => {
  const navigate = useNavigate();
  const returnToMain = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, invalid, values }) => (
        <>
          <Button onClick={returnToMain}>
            На главную
          </Button>

          <form className="form" onSubmit={(e) => { e.preventDefault(); }}>
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

            <Button disabled={invalid} onClick={async () => {
              await handleSubmit();
              form.reset();
            }}>
              Сохранить
            </Button>
          </form>
        </>
      )}
    />
  );
};

export const Add = connect(null, {
  onSubmit: addEmployee,
})(_Add);
