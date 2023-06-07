import { AxiosResponse } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { EmployeeType, EmployeeIDType, FilterType } from 'types';

import { fetchEmployees } from 'api/fetchEmployees';
import { addEmployeeRequest } from 'api/addEmployee';
import { removeEmployeeRequest } from 'api/removeEmployee';
import { editEmployeeRequest } from 'api/editEmployee';
import { fetchEmployee } from 'api/fetchEmployee';

import { selectEditData, selectEmployees } from 'store/employee';
import { RootStore } from 'store/reducers';
import { addNewEmployee, editOldEmployee, filterRemovedEmployees } from 'utils';

export const setLoading = createAction<boolean>('SET_LOADING');
export const setEditData = createAction<EmployeeType>('SET_EMPLOYEE');
export const setFilter = createAction<FilterType>('SET_FILTER_VALUE');
export const setEmployees = createAction<Partial<EmployeeType>[]>('SET_EMPLOYEES');

// Реализовано, просто не нашла применения в UI :)
export const getEmployee = createAsyncThunk<Promise<EmployeeType | AxiosResponse<EmployeeType>>, EmployeeIDType>(
  'GET_EMPLOYEE',
  async (id: EmployeeIDType) => {
    return await fetchEmployee<EmployeeType>(id);
  },
);

export const getEmployees = createAsyncThunk<Promise<EmployeeType[] | AxiosResponse<EmployeeType[]>>, undefined>(
  'GET_EMPLOYEES',
  async (_, { dispatch }) => {
    // dispatch(setLoading(true));
    return await fetchEmployees<EmployeeType[]>();
  },
);

export const addEmployee = createAsyncThunk<void, Partial<EmployeeType>>(
  'ADD_EMPLOYEE',
    async (employee, { dispatch, getState }) => {
      const state = getState();
      const employees = selectEmployees(state);

      await dispatch(setEmployees(addNewEmployee(employee, employees)))
      await addEmployeeRequest<Partial<EmployeeType>>(employee)
      dispatch(getEmployees());
    },
);

export const editEmployee = createAsyncThunk<void, Partial<EmployeeType>, { state: RootStore }>(
  'EDIT_EMPLOYEE',
  async (employee, { dispatch, getState }) => {
    const state = getState();
    const editData = selectEditData(state);
    const employees = selectEmployees(state);

    await dispatch(setEmployees(editOldEmployee(employee, employees)));
    await editEmployeeRequest<Partial<EmployeeType>>({ ...editData, ...employee });
    dispatch(getEmployees());
  },
);

export const removeEmployee = createAsyncThunk<void, EmployeeIDType | undefined>(
  'REMOVE_EMPLOYEE',
  async (id, { dispatch, getState }) => {
    if (!id) throw new Error('No id provided');
    const state = getState();
    const employees = selectEmployees(state);

    await dispatch(setEmployees(filterRemovedEmployees(id, employees)))
    await removeEmployeeRequest<void>(id);
    dispatch(getEmployees());
  },
);
