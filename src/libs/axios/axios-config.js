import axios from 'axios';
import { camelizeKeys } from 'humps';
import { CONFIG } from '../../utils/config-global';

const axiosInstance = axios.create({
  baseURL: CONFIG.site.apiUrl,
});

axiosInstance.interceptors.request.use(async config => {
  const newConfig = { ...config };

  return newConfig;
});

axiosInstance.interceptors.response.use(
  async response => {
    if (response.data) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  error => {
    if (error.response?.data) {
      error.response.data = camelizeKeys(error.response.data);
    }

    const status = error.response?.status;

    if (status === 500) {
      throw {
        error: 'Something went wrong',
        statusCode: 500,
      };
    }

    throw error.response?.data;
  }
);

export default axiosInstance;
