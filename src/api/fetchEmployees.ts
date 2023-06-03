import { axiosBaseRequest } from './index';
import endpoints from './endpoints';

export const fetchEmployees = <T>() => axiosBaseRequest<T>({
  url: endpoints.getEmployees,
});