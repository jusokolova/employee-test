import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

interface ExtAxiosRequestConfig extends AxiosRequestConfig {
  originalResponse?: boolean,
}

type Response<T> = AxiosPromise<T> | Promise<T>;

export const axiosBaseRequest = <ResultType>({
  method = 'get',
  timeout = 40000,
  responseType = 'json',
  withCredentials = false,
  originalResponse = false,
  ...config
}: ExtAxiosRequestConfig): Response<ResultType> => {
  const response = axios({
    method,
    timeout,
    responseType,
    withCredentials,
    ...config,
  });

  return originalResponse ? response : response.then(({ data }) => data);
};
