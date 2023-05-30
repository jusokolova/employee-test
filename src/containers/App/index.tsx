import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import type { EmployeeType } from 'types';

import { initializeStore } from 'store';
import { rootReducer, RootStore } from 'store/reducers';
import { getEmployees, selectEmployees, selectIsLoading } from 'store/employee';

import { withReduxStore } from 'hocs';
import { Button } from 'components';
import './styles.css';

type AppPropsType = {
  onClick: () => void,
  employees: EmployeeType[],
  isLoading: boolean,
};

function App({ onClick, employees, isLoading }: AppPropsType) {
  return (
    <div className="app">
      <Button type="button" onClick={onClick}>
        {isLoading ? '...Loading' : 'Get employee'}
      </Button>

      {employees && (
        <ul>
          {employees.map((employee) => (
            <li key={employee.employeeId}>
              {employee.firstName} {employee.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



export default compose(
  withReduxStore(initializeStore(rootReducer)),
  connect((state: RootStore) => ({
    employees: selectEmployees(state),
    isLoading: selectIsLoading(state),
  }), {
    onClick: getEmployees,
  }),
)(App);
