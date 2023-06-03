import { RootStore } from '../reducers';
import { selectEmployeeStore } from '../selectors';

export const selectEmployees = (state: RootStore) => selectEmployeeStore(state).employees;
export const selectEditData = (state: RootStore) => selectEmployeeStore(state).editData;
export const selectIsLoading = (state: RootStore) => selectEmployeeStore(state).isLoading;
export const selectIsError = (state: RootStore) => selectEmployeeStore(state).isError;
