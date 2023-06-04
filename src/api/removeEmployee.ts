import type { EmployeeIDType } from 'types';

import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

export const removeEmployeeRequest = <T>(id: EmployeeIDType) => axiosBaseRequest<T>({
  headers: { Accept: '*/*' },
  method: 'DELETE',
  url: endpoints.removeEmployee(id),
});
