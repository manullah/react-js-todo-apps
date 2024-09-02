export const CONFIG = {
  site: {
    name: 'Todo Apps',
    baseUrl: process.env.REACT_APP_BASE_HOST ?? '',
    apiUrl: process.env.REACT_APP_API_URL ?? '',
  },

  auth: {
    storageKey: 'my-auth',
  },
};
