import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { CONFIG } from '../../utils/constant/global-config';

const axiosInstance = axios.create({
  baseURL: CONFIG.site.apiUrl,
});

axiosInstance.interceptors.request.use(async config => {
  const newConfig = { ...config };

  const storage = localStorage.getItem(CONFIG.auth.storageKey);
  if (storage) {
    newConfig.headers.Authorization = `Bearer ${storage}`;
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

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
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Something went wrong',
        statusCode: 500,
      };
    }

    throw error.response?.data;
  }
);

export default axiosInstance;
