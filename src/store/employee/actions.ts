import { AxiosResponse } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { EmployeeType } from 'types';

import { fetchEmployees } from 'api/fetchEmployees';
import { addEmployeeRequest } from 'api/appEmployee';

export const setLoading = createAction<boolean>('SET_LOADING');

export const getEmployees = createAsyncThunk<AxiosResponse<EmployeeType[]>, undefined>(
  'GET_EMPLOYEES',
  async () => {
    return await fetchEmployees<EmployeeType[]>();
  },
);

export const addEmployee = createAsyncThunk<void, EmployeeType>(
  'ADD_EMPLOYEE',
    (employee, { dispatch }) => {
      addEmployeeRequest<EmployeeType>({
        ...employee,
        birthday: new Date(Date.parse(employee.birthday)).toISOString(),
      }).then(() => {
        dispatch(getEmployees());
      });
    },
);
