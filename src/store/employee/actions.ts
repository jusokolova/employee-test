import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { EmployeeType } from 'types';

import { fetchEmployees } from 'api/fetchEmployees';

export const setLoading = createAction<boolean>('SET_LOADING');

export const getEmployees = createAsyncThunk<void, string>(
  'GET_EMPLOYEES',
  async () => fetchEmployees<EmployeeType[]>(),
);
