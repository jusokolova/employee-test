import { RootStore } from '../reducers';
import { selectEmployeeStore } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectEmployees = (state: RootStore) => selectEmployeeStore(state).employees;
export const selectEditData = (state: RootStore) => selectEmployeeStore(state).editData;
export const selectIsLoading = (state: RootStore) => selectEmployeeStore(state).isLoading;
export const selectIsError = (state: RootStore) => selectEmployeeStore(state).isError;
export const selectFilter = (state: RootStore) => selectEmployeeStore(state).filter;
export const selectFilterValue = (state: RootStore) => selectFilter(state).value;
export const selectFilterBy = (state: RootStore) => selectFilter(state).filterBy;
export const selectFilterResult = (state: RootStore) => selectFilter(state).result;
export const selectRenderEmployees = createSelector(
  [selectFilterResult, selectEmployees],
  (result, employees) => result.length ? result : employees,
);
