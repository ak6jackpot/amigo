export const APIBaseConfig = {
  createUser: {
    endpoint: '/merchant/',
    method: 'POST',
  },
  generateOtp: {
    endpoint: '/authentication/app-authenticate/',
    method: 'POST',
  },
  validateOtp: {
    endpoint: '/authentication/app-validate/',
    method: 'POST',
  },
};

export type APIEndpointsType = keyof typeof APIBaseConfig;
