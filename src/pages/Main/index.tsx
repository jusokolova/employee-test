import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import type { EmployeeIDType, EmployeeType, HeadersType } from 'types';
import type { RootStore } from 'store/reducers';
import { getEmployees, selectIsLoading, setEditData, removeEmployee, selectRenderEmployees,
  selectFilterValue, selectFilterResult } from 'store/employee';
import { Button, Table, ButtonsGroup, Preloader, Input, Select } from 'components';
import { ROUTES } from 'pages/index';
import { SELECT_OPTIONS, DEFAULT_SELECT_OPTION, NO_RESULTS_FOUND } from 'utils';

import { MainTable, FilterForm } from './components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type MainPagePropsType = {
  results: (EmployeeType | undefined)[],
  filterValue: string,
  deleteEmployee: (id: EmployeeIDType) => void,
  editEmployee: (employee: EmployeeType) => void,
  filter: ({ value, filterBy, result }: { value: string, filterBy: HeadersType, result: (EmployeeType | undefined)[] }) => void,
  fetchEmployees: () => any,
  employees: EmployeeType[],
  isLoading: boolean,
};

const _MainPage: FC<MainPagePropsType> = ({
  filterValue,
  isLoading,
  fetchEmployees,
  editEmployee,
  deleteEmployee,
  employees,
  results,
}) => {
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
      <h1>
        Employee API
      </h1>

      <ButtonsGroup
        mainButton={
          <Button disabled={isLoading} type="button" onClick={fetchEmployees}>
            Обновить
          </Button>
        }
        secondaryButton={
          <Button onClick={() => { navigate(ROUTES.ADD); }}>
            Добавить сотрудника
          </Button>
        }
      />

      {isLoading && <Preloader />}

      <FilterForm>
        <>
          <Select
            label="Фильтровать по"
            name="filterBy"
            options={Object.values({ default: DEFAULT_SELECT_OPTION, ...SELECT_OPTIONS })}
          />

          <Input name="value" placeholder="Фильтр" />
        </>
      </FilterForm>

      {!results.length && filterValue ? NO_RESULTS_FOUND : (
        <MainTable shouldRender={!isLoading && !!employees.length}>
          {employees.map((employee) => (
            <Table.Row key={employee.employeeId}>
              {Object.values(employee).map((value) => (
                <Table.Cell key={value}>
                  {value}
                </Table.Cell>
              ))}

              <Table.Cell>
                <Button
                  className={cx('delete-button')}
                  onClick={() => { deleteEmployee(employee.employeeId) }}
                />
              </Table.Cell>

              <Table.Cell>
                <Button onClick={async () => { await handleEdit(employee); }}>
                  Редактировать
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </MainTable>
      )}
    </div>
  )
};

export const MainPage = connect((state: RootStore) => ({
  employees: selectRenderEmployees(state),
  isLoading: selectIsLoading(state),
  filterValue: selectFilterValue(state),
  results: selectFilterResult(state),
}), {
  fetchEmployees: getEmployees,
  deleteEmployee: removeEmployee,
  editEmployee: setEditData,
})(_MainPage);
