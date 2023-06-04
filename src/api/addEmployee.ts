import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

import type { EmployeeType } from 'types';

export const addEmployeeRequest = <T>(employee: Partial<EmployeeType>) => axiosBaseRequest<T>({
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  url: endpoints.default,
  data: employee,
});
