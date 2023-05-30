import { combineReducers } from 'redux';

import { employeeReducer } from './employee';

export const rootReducer = combineReducers({
  employee: employeeReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;
