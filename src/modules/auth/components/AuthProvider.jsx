import axiosInstance from '../../../libs/axios/axios-config';

import { AuthContext } from '../context/auth-context';
import { jwtDecode } from '../../../utils/utils';
import { CONFIG } from '../../../utils/constant/global-config';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { paths } from '../../../utils/constant/path-config';

function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState({
    email: '',
    token: '',
  });

  const getUser = () => {
    try {
      const storage = localStorage.getItem(CONFIG.auth.storageKey);

      if (!storage) {
        return redirect(paths.auth.login);
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${storage}`;
      const decode = jwtDecode(storage);

      setUser({
        email: decode.email,
        token: storage,
      });
    } catch (error) {
      console.error('Error during get session:', error);
      throw error;
    }
  };

  const onSaveToken = accessToken => {
    try {
      localStorage.setItem(CONFIG.auth.storageKey, accessToken);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const decode = jwtDecode(accessToken);

      setUser({
        email: decode.email,
        token: accessToken,
      });
    } catch (error) {
      console.error('Error during save session:', error);
      throw error;
    }
  };

  const onRemoveToken = () => {
    try {
      localStorage.removeItem(CONFIG.auth.storageKey);
      setUser({
        email: '',
        token: '',
      });
    } catch (error) {
      console.error('Error during remove session:', error);
      throw error;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        getUser,
        onSaveToken,
        onRemoveToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
