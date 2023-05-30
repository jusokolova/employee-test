import { RootStore } from './reducers';

export const selectEmployeeStore = (state: RootStore) => state.employee || {};
