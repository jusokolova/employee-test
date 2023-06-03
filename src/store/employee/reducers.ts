import { createReducer } from '@reduxjs/toolkit';

import type { EmployeeType } from 'types';

import { setLoading, getEmployees, addEmployee } from './actions';

type InitialStateType = {
  isLoading: boolean,
  isError: boolean,
  employees: EmployeeType[] | never[],
  currentEmployee: EmployeeType | Record<string, never>,
  editData: EmployeeType | Record<string, never>,
};

const initialState: InitialStateType = {
  isLoading: false,
  isError: false,
  employees: [],
  currentEmployee: {},
  editData: {},
};

export const employeeReducer = createReducer(initialState, {
  [setLoading.type]: (state, { payload }) => {
    state.isLoading = payload;
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
  [addEmployee.fulfilled.type]: (state, { payload }) => {
    state.isLoading = false;
  },
  [addEmployee.rejected.type]: (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
  },
});
