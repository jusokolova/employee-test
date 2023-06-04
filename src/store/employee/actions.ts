import { AxiosResponse } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { EmployeeType } from 'types';

import { fetchEmployees } from 'api/fetchEmployees';
import { addEmployeeRequest } from 'api/addEmployee';
import { removeEmployeeRequest } from 'api/removeEmployee';
import { editEmployeeRequest } from 'api/editEmployee';

import { selectEditData } from 'store/employee';
import { RootStore } from 'store/reducers';

export const setLoading = createAction<boolean>('SET_LOADING');
export const setEditData = createAction<EmployeeType>('SET_EMPLOYEE');
export const setFilter = createAction<{ value: string, filterBy: string, result: (EmployeeType | undefined)[] }>('SET_FILTER_VALUE');

export const getEmployees = createAsyncThunk<Promise<EmployeeType[] | AxiosResponse<EmployeeType[]>>, undefined>(
  'GET_EMPLOYEES',
  async () => {
    return await fetchEmployees<EmployeeType[]>();
  },
);

export const addEmployee = createAsyncThunk<void, EmployeeType>(
  'ADD_EMPLOYEE',
    async (employee, { dispatch }) => {
      await addEmployeeRequest<EmployeeType>(employee)
      dispatch(getEmployees());
    },
);

export const editEmployee = createAsyncThunk<void, Partial<EmployeeType>, { state: RootStore }>(
  'EDIT_EMPLOYEE',
  async (employee, { dispatch, getState }) => {
    const state = getState();
    const editData = selectEditData(state);
    await editEmployeeRequest<Partial<EmployeeType>>({ ...editData, ...employee })
    dispatch(getEmployees());
  },
);

export const removeEmployee = createAsyncThunk<void, number>(
  'REMOVE_EMPLOYEE',
  async (id, { dispatch }) => {
    await removeEmployeeRequest<Pick<EmployeeType, 'employeeId'>>(id);
    dispatch(getEmployees());
  },
);
