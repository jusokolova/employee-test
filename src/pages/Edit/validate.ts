import { EmployeeType } from 'types';

export type ErrorsType = Record<keyof EmployeeType | 'empty' | string, string | never>;

export const validate = (values: Partial<EmployeeType>): ErrorsType => {
  const errors: ErrorsType = {};

  if (!values.employeeId) {
    errors.employeeId = 'Required'
  }

  if (!Object.values(values).length) {
    errors.empty = 'Форма не может быть пустой'
  }

  return errors
};