import type { EmployeeType, HeadersType } from 'types';

export const EMPLOYEE_FIELDS = {
  id: 'employeeId',
  firstName: 'firstName',
  lastName: 'lastName',
  birthday: 'birthday',
  height: 'height',
} as const;

export const TABLE_HEADERS = {
  [EMPLOYEE_FIELDS.id]: 'ID',
  [EMPLOYEE_FIELDS.firstName]: 'Имя',
  [EMPLOYEE_FIELDS.lastName]: 'Фамилия',
  [EMPLOYEE_FIELDS.birthday]: 'Дата рождения',
  [EMPLOYEE_FIELDS.height]: 'Рост',
  delete: 'Удалить',
  edit: 'Редактировать',
} as const;

export const SELECT_OPTIONS = {
  [EMPLOYEE_FIELDS.id]: 'ID',
  [EMPLOYEE_FIELDS.firstName]: 'Имя',
  [EMPLOYEE_FIELDS.lastName]: 'Фамилия',
  [EMPLOYEE_FIELDS.birthday]: 'Дата рождения',
  [EMPLOYEE_FIELDS.height]: 'Рост',
} as const;

export const HEADERS = {
  'ID': EMPLOYEE_FIELDS.id,
  'Имя': EMPLOYEE_FIELDS.firstName,
  'Фамилия': EMPLOYEE_FIELDS.lastName,
  'Дата рождения': EMPLOYEE_FIELDS.birthday,
  'Рост': EMPLOYEE_FIELDS.height,
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

export const filterByValue = ({ header, value, employees }: { header: HeadersType, value: string, employees: EmployeeType[] }): (EmployeeType | undefined)[] => {
  if (!value || !header || !employees.length) return [];

  return employees
    .map((employee) => employee[HEADERS[header]])
    .filter((data) => String(data).match(value))
    .map((match) => employees.find((employee) => employee[HEADERS[header]] === match));
};
