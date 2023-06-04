import React, { FC, PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { FormSpy } from 'react-final-form';

import type { EmployeeType, FilterType, HeadersType } from 'types';
import type { RootStore } from 'store/reducers';
import { selectRenderEmployees, setFilter } from 'store/employee';
import { DEFAULT_SELECT_OPTION, filterByValue } from 'utils';

import { Form } from './Form';

type FilterFormPropsType = {
  filter: ({ value, filterBy, result }: FilterType) => void,
  employees: EmployeeType[],
};

const _FilterForm: FC<PropsWithChildren<FilterFormPropsType>> = ({ filter, employees, children }) => (
  <Form onSubmit={() => {}}>
    {() => (
      <>
        {children}

        <FormSpy
          subscription={{ values: true }}
          onChange={({ values }: { values: { value: string, filterBy: HeadersType | typeof DEFAULT_SELECT_OPTION } }) => {
            if (values.filterBy === DEFAULT_SELECT_OPTION) return;

            filter({
              filterBy: values.filterBy,
              value: values.value || '',
              result: filterByValue({ header: values.filterBy, value: values.value, employees })
            });
          }}
        />
      </>
    )}
  </Form>
);

export const FilterForm = connect((state: RootStore) => ({
  employees: selectRenderEmployees(state),
}), {
  filter: setFilter,
})(_FilterForm);
