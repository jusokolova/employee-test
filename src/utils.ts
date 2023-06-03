import { EmployeeType } from 'types';

export const TABLE_HEADERS = {
  employeeId: 'ID',
  firstName: 'Имя',
  lastName: 'Фамилия',
  birthday: 'Дата рождения',
  height: 'Рост',
  delete: 'Удалить',
  edit: 'Редактировать',
};

export const mapNewEmployee = (employee: Partial<EmployeeType>): Partial<EmployeeType> => ({
  ...employee,
  birthday: employee.birthday ? new Date(Date.parse(employee.birthday)).toISOString() : undefined,
});

export const mapEditEmployee = (employee: Partial<EmployeeType>): Partial<EmployeeType> => ({
  ...employee,
  birthday: employee.birthday ? employee.birthday.slice(0, 10) : undefined,
});
