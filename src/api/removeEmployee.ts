import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

export const removeEmployeeRequest = <T>(id: number) => axiosBaseRequest<T>({
  headers: { Accept: '*/*' },
  method: 'DELETE',
  url: endpoints.removeEmployee(id),
});
