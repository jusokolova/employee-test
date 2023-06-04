import { HEADERS } from 'utils';

export type EmployeeType = {
  employeeId?: number,
  firstName: string,
  lastName: string,
  birthday: string,
  height?: number,
};

export type EmployeeIDType = Pick<EmployeeType, 'employeeId'>;

export type FilterType = { value: string, filterBy: string, result: (EmployeeType | undefined)[] };

export type HeadersType = keyof typeof HEADERS;
