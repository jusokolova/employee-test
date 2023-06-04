import type { EmployeeIDType } from 'types';

const defaultEndpoint = 'https://reactapi.bsite.net/api/Employee';

const endpoints =  {
  default: defaultEndpoint,
  removeEmployee: (id: EmployeeIDType) => `${defaultEndpoint}/${id}`,
};

export default endpoints;
