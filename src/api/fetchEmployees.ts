import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

export const fetchEmployees = <T>() => {
  return axiosBaseRequest<T>({
    url: endpoints.getEmployees,
  });
}