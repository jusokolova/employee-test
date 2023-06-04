import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FormSpy } from 'react-final-form';

import type { EmployeeType } from 'types';
import type { RootStore } from 'store/reducers';
import {
  getEmployees,
  selectIsLoading,
  setEditData,
  removeEmployee,
  setFilter, selectRenderEmployees, selectFilterValue,
} from 'store/employee';
import { Button, Table, ButtonsGroup, Preloader, Input, Select } from 'components';
import { ROUTES } from 'pages/index';
import { filterByValue, SELECT_OPTIONS, HEADERS } from 'utils';

import { MainTable, FilterForm } from './components';
import styles from './styles.css';
import { selectFilterResult } from 'store/employee/selectors';

const cx = classNames.bind(styles);

type MainPagePropsType = {
  results: (EmployeeType | undefined)[],
  filterValue: string,
  deleteEmployee: (id: number) => void,
  editEmployee: (employee: EmployeeType) => void,
  filter: ({ value, filterBy, result }: { value: string, filterBy: keyof typeof HEADERS, result: (EmployeeType | undefined)[] }) => void,
  fetchEmployees: () => any,
  employees: EmployeeType[],
  isLoading: boolean,
};

const _MainPage: FC<MainPagePropsType> = ({
  filterValue,
  filter,
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

      <FilterForm onSubmit={() => {}}>
        {() => (
          <>
            <Select
              label="Фильтровать по"
              name="filterBy"
              options={Object.values({ default: 'Выберите поле', ...SELECT_OPTIONS })}
            />
            <Input name="value" placeholder="Фильтр" />
            <FormSpy
              subscription={{ values: true }}
              onChange={({ values }: { values: { value: string, filterBy: keyof typeof HEADERS } }) => {
                filter({
                  filterBy: values.filterBy,
                  value: values.value || '',
                  result: filterByValue({ header: values.filterBy, value: values.value, employees })
                });
              }}
            />
          </>
        )}
      </FilterForm>

      {!results.length && filterValue ? 'Нет результатов' : (
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
                  onClick={() => { deleteEmployee(employee.employeeId!) }}
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
  filter: setFilter,
})(_MainPage);
