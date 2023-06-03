import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import type { EmployeeType } from 'types';
import type { RootStore } from 'store/reducers';
import { getEmployees, selectEmployees, selectIsLoading, setEditData, removeEmployee } from 'store/employee';
import { Button, Table } from 'components';
import { MainTable } from './components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/index';

type MainPagePropsType = {
  deleteEmployee: (id: number) => void,
  editEmployee: (employee: EmployeeType) => void,
  fetchEmployees: () => any,
  employees: EmployeeType[],
  isLoading: boolean,
};

const _MainPage: FC<MainPagePropsType> = ({ isLoading, fetchEmployees, editEmployee, deleteEmployee, employees }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!employees.length) {
      fetchEmployees();
    }
  }, []);

  const handleEdit = async (employee: EmployeeType) => {
    await editEmployee(employee);
    navigate(ROUTES.EDIT);
  };

  return (
    <div>
      <Button onClick={() => { navigate(ROUTES.ADD); }}>
        Добавить сотрудника
      </Button>
      <Button disabled={isLoading} type="button" onClick={fetchEmployees}>
        Обновить
      </Button>

      <MainTable shouldRender={!isLoading && !!employees.length}>
        {employees.map((employee) => (
          <Table.Row key={employee.employeeId}>
            {Object.values(employee).map((value) => (
              <Table.Cell key={value}>
                {value}
              </Table.Cell>
            ))}
            <Table.Cell>
              <Button onClick={() => { deleteEmployee(employee.employeeId!) }}>
                Удалить
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button onClick={async () => { await handleEdit(employee); }}>
                Редактировать
              </Button>
            </Table.Cell>
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
  fetchEmployees: getEmployees,
  deleteEmployee: removeEmployee,
  editEmployee: setEditData,
})(_MainPage);
