import { EmployeeType } from 'types';

export const TABLE_HEADERS = {
  employeeId: 'ID',
  firstName: 'Имя',
  lastName: 'Фамилия',
  birthday: 'Дата рождения',
  height: 'Рост',
};

export const mapNewEmployee = (employee: EmployeeType): EmployeeType => ({
  ...employee,
  birthday: new Date(Date.parse(employee.birthday)).toISOString(),
});