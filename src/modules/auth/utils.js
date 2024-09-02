import { redirect } from 'react-router-dom';
import { CONFIG } from '../../utils/constant/global-config';
import { paths } from '../../utils/constant/path-config';
import axiosInstance from '../../libs/axios/axios-config';
import { jwtDecode } from '../../utils/utils';

export const guardOnly = async () => {
  const storage = localStorage.getItem(CONFIG.auth.storageKey);

  if (!storage) {
    return redirect(paths.auth.login);
  }

  return null;
};

export const guessOnly = async () => {
  const storage = localStorage.getItem(CONFIG.auth.storageKey);

  if (storage) {
    return redirect(paths.root);
  }

  return null;
};

export const getUser = () => {
  try {
    const storage = localStorage.getItem(CONFIG.auth.storageKey);

    const decode = jwtDecode(storage);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${storage}`;

    return {
      email: decode.email,
      token: storage,
    };
  } catch (error) {
    console.error('Error during get session:', error);
    throw error;
  }
};

export const onSaveToken = accessToken => {
  try {
    localStorage.setItem(CONFIG.auth.storageKey, accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    console.error('Error during save session:', error);
    throw error;
  }
};

export const onRemoveToken = () => {
  try {
    localStorage.removeItem(CONFIG.auth.storageKey);
  } catch (error) {
    console.error('Error during remove session:', error);
    throw error;
  }
};
