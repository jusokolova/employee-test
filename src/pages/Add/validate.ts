import { EmployeeType } from 'types';

export type ErrorsType = Record<keyof EmployeeType | string, string | never>;

export const validate = (values: EmployeeType): ErrorsType => {
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