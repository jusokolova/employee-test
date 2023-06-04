import { FC, PropsWithChildren, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import type { RootStore } from 'store/reducers';
import { selectFilterResult, selectRenderEmployees, setEmployees } from 'store/employee';
import { sortByHeader } from 'utils';
import { EmployeeType, HeadersType } from 'types';

import styles from './styles.css';

const cx = classNames.bind(styles);

type SortPropsType = {
  value: HeadersType,
  employees: EmployeeType[],
  filterResults: (EmployeeType | undefined)[],
  onSort: (value: (EmployeeType | undefined)[] | undefined) => void,
};

const _Sort: FC<PropsWithChildren<SortPropsType>> = ({
  value,
  employees,
  filterResults,
  onSort,
  children,
}) => {
  const [isSorted, setSorted] = useState(false);

  const handleClick = () => {
    onSort(sortByHeader({ header: value, employees: filterResults.length ? filterResults : employees, isSorted }));
    setSorted((prev) => !prev);
  };

  return (
    <div className={cx('sort-container')}>
      <div className={cx('sort-icon')} onClick={handleClick} />

      {children}
    </div>
  );
};

const mapStateToProps = (state: RootStore) => ({
  employees: selectRenderEmployees(state),
  filterResults: selectFilterResult(state),
});

const mapDispatchToProps = {
  onSort: setEmployees,
};

export const Sort = connect(mapStateToProps, mapDispatchToProps)(_Sort);