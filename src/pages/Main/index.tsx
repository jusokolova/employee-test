import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import type { RootStore } from 'store/reducers';
import { getEmployees, selectEmployees, selectIsLoading } from 'store/employee';
import { Button, Table } from 'components';
import { MainTable } from './components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/index';

type MainPagePropsType = {
  onClick: any,
  employees: EmployeeType[],
  isLoading: boolean,
};

const _MainPage: FC<MainPagePropsType> = ({ isLoading, onClick, employees }) => {
  const navigate = useNavigate();
  const handleAddEmployee = useCallback(() => {
    navigate(ROUTES.ADD);
  }, []);

  return (
    <div>
      <Button onClick={handleAddEmployee}>
        Добавить сотрудника
      </Button>
      <Button type="button" onClick={onClick}>
        {isLoading ? '...Загрузка' : 'Показать всё'}
      </Button>

      <MainTable shouldRender={!isLoading && !!employees.length}>
        {employees.map((employee) => (
          <Table.Row key={employee.employeeId}>
            {Object.values(employee).map((value) => (
              <Table.Cell key={value}>
                {value}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </MainTable>
    </div>
  )
};

export const MainPage = connect((state: RootStore) => ({
  employees: selectEmployees(state),
  isLoading: selectIsLoading(state),
}), {
  onClick: getEmployees,
})(_MainPage);
