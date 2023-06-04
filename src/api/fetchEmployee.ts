import type { EmployeeIDType } from 'types';

import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

export const fetchEmployee = <T>(id: EmployeeIDType) => axiosBaseRequest<T>({
  url: endpoints.default,
  params: { id }
});