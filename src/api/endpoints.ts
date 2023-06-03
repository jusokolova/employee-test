const defaultEndpoint = 'https://reactapi.bsite.net/api/Employee';

const endpoints =  {
  default: defaultEndpoint,
  removeEmployee: (id?: number) => `${defaultEndpoint}/${id}`,
};

export default endpoints;
