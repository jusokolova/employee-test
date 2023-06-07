import { createReducer } from '@reduxjs/toolkit';

import type { EmployeeType, FilterType } from 'types';

import { setLoading, getEmployees, addEmployee, setEditData, editEmployee, setFilter, removeEmployee,
  setEmployees } from './actions';
import { mapEditEmployee } from 'utils';

type InitialStateType = {
  isLoading: boolean,
  isError: boolean,
  employees: EmployeeType[] | never[],
  editData: EmployeeType | Record<string, string | number | never>,
  filter: FilterType,
};

const initialState: InitialStateType = {
  isLoading: false,
  isError: false,
  employees: [],
  editData: {},
  filter: { value: '', filterBy: '', result: [] },
};

export const employeeReducer = createReducer(initialState, {
  [setLoading.type]: (state, { payload }) => {
    state.isLoading = payload;
  },
  [setEmployees.type]: (state, { payload }) => {
    state.employees = payload;
  },
  [setFilter.type]: (state, { payload }) => {
    state.filter = {
      ...state.filter,
      ...payload,
    };
  },
  [setEditData.type]: (state, { payload }) => {
    state.editData = mapEditEmployee(payload);
  },
  [getEmployees.pending.type]: (state) => {
    if (state.isError) {
      state.isError = false;
    }
  },
  [getEmployees.fulfilled.type]: (state, { payload }) => {
    if (state.isLoading) {
      state.isLoading = false;
    }

    state.employees = payload;
  },
  [getEmployees.rejected.type]: (state) => {
    state.isError = true;
  },
  [addEmployee.pending.type]: (state) => {
    if (state.isError) {
      state.isError = false;
    }
  },
  [addEmployee.rejected.type]: (state) => {
    state.isError = true;
  },
  [editEmployee.pending.type]: (state) => {
    if (state.isError) {
      state.isError = false;
    }
  },
  [editEmployee.fulfilled.type]: (state) => {
    state.editData = initialState.editData;
  },
  [editEmployee.rejected.type]: (state) => {
    state.isError = true;
  },
  [removeEmployee.pending.type]: (state) => {
    if (state.isError) {
      state.isError = false;
    }
  },
  [removeEmployee.rejected.type]: (state) => {
    state.isError = true;
  },
});
