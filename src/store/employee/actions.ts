import { AxiosResponse } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { EmployeeType, EmployeeIDType, FilterType } from 'types';

import { fetchEmployees } from 'api/fetchEmployees';
import { addEmployeeRequest } from 'api/addEmployee';
import { removeEmployeeRequest } from 'api/removeEmployee';
import { editEmployeeRequest } from 'api/editEmployee';

import { selectEditData } from 'store/employee';
import { RootStore } from 'store/reducers';
import { fetchEmployee } from 'api/fetchEmployee';

export const setLoading = createAction<boolean>('SET_LOADING');
export const setEditData = createAction<EmployeeType>('SET_EMPLOYEE');
export const setFilter = createAction<FilterType>('SET_FILTER_VALUE');

// Реализовано, просто не нашла применения в UI :)
export const getEmployee = createAsyncThunk<Promise<EmployeeType | AxiosResponse<EmployeeType>>, EmployeeIDType>(
  'GET_EMPLOYEE',
  async (id: EmployeeIDType) => {
    return await fetchEmployee<EmployeeType>(id);
  },
);

export const getEmployees = createAsyncThunk<Promise<EmployeeType[] | AxiosResponse<EmployeeType[]>>, undefined>(
  'GET_EMPLOYEES',
  async () => {
    return await fetchEmployees<EmployeeType[]>();
  },
);

export const addEmployee = createAsyncThunk<void, Partial<EmployeeType>>(
  'ADD_EMPLOYEE',
    async (employee, { dispatch }) => {
      await addEmployeeRequest<Partial<EmployeeType>>(employee)
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

export const removeEmployee = createAsyncThunk<void, EmployeeIDType | undefined>(
  'REMOVE_EMPLOYEE',
  async (id, { dispatch }) => {
    if (!id) throw new Error('No id provided');

    await removeEmployeeRequest<void>(id);
    dispatch(getEmployees());
  },
);
