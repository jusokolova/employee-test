import { EmployeeType } from 'types';

export const TABLE_HEADERS = {
  employeeId: 'ID',
  firstName: 'Имя',
  lastName: 'Фамилия',
  birthday: 'Дата рождения',
  height: 'Рост',
  delete: 'Удалить',
  edit: 'Редактировать',
} as const;

export const SELECT_OPTIONS = {
  employeeId: 'ID',
  firstName: 'Имя',
  lastName: 'Фамилия',
  birthday: 'Дата рождения',
  height: 'Рост',
} as const;

export const HEADERS = {
  'ID': 'employeeId',
  'Имя': 'firstName',
  'Фамилия': 'lastName',
  'Дата рождения': 'birthday',
  'Рост': 'height',
} as const;

export const DEFAULT_SELECT_OPTION = 'Выберите поле' as const;

export const NO_RESULTS_FOUND = 'Нет результатов';

export const mapNewEmployee = (employee: Partial<EmployeeType>): Partial<EmployeeType> => ({
  ...employee,
  birthday: employee.birthday ? new Date(Date.parse(employee.birthday)).toISOString() : undefined,
});

export const mapEditEmployee = (employee: Partial<EmployeeType>): Partial<EmployeeType> => ({
  ...employee,
  birthday: employee.birthday ? employee.birthday.slice(0, 10) : undefined,
});

export const filterByValue = ({ header, value, employees }: { header: keyof typeof HEADERS, value: string, employees: EmployeeType[] }): (EmployeeType | undefined)[] => {
  if (!value || !header || !employees.length) return [];

  return employees
    .map((employee) => employee[HEADERS[header]])
    .filter((data) => String(data).match(value))
    .map((match) => employees.find((employee) => employee[HEADERS[header]] === match));
};
