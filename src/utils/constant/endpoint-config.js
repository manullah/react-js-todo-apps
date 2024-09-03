export const endpoints = {
  auth: {
    login: '/auth/sign-in',
    register: '/auth/sign-up',
  },

  board: {
    getAll: '/board',
    getDetails: id => `/board/${id}`,
    create: '/board',
    update: id => `/board/${id}`,
    delete: id => `/board/${id}`,
  },
};
