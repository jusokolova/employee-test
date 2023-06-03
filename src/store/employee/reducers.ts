import { createReducer } from '@reduxjs/toolkit';

import type { EmployeeType } from 'types';

import { setLoading, getEmployees, addEmployee, setEditData, editEmployee } from './actions';
import { mapEditEmployee } from 'utils';

type InitialStateType = {
  isLoading: boolean,
  isError: boolean,
  employees: EmployeeType[] | never[],
  editData: EmployeeType | Record<string, string | number | never>,
};

const initialState: InitialStateType = {
  isLoading: false,
  isError: false,
  employees: [],
  editData: {},
};

export const employeeReducer = createReducer(initialState, {
  [setLoading.type]: (state, { payload }) => {
    state.isLoading = payload;
  },
  [setEditData.type]: (state, { payload }) => {
    state.editData = mapEditEmployee(payload);
  },
  [getEmployees.pending.type]: (state) => {
    state.isLoading = true;

    if (state.isError) {
      state.isError = false;
    }
  },
  [getEmployees.fulfilled.type]: (state, { payload }) => {
    state.isLoading = false;
    state.employees = payload;
  },
  [getEmployees.rejected.type]: (state) => {
    state.isLoading = false;
    state.isError = true;
  },
  [addEmployee.pending.type]: (state) => {
    state.isLoading = true;

    if (state.isError) {
      state.isError = false;
    }
  },
  [addEmployee.fulfilled.type]: (state) => {
    state.isLoading = false;
  },
  [addEmployee.rejected.type]: (state) => {
    state.isLoading = false;
    state.isError = true;
  },
  [editEmployee.pending.type]: (state) => {
    state.isLoading = true;

    if (state.isError) {
      state.isError = false;
    }
  },
  [editEmployee.fulfilled.type]: (state,) => {
    state.editData = initialState.editData;
    state.isLoading = false;
  },
  [editEmployee.rejected.type]: (state) => {
    state.editData = initialState.editData;
    state.isLoading = false;
    state.isError = true;
  },
});
