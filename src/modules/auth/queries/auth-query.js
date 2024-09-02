import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../apis/auth-api';

export class AuthQuery {
  static useLogin = args => {
    return useMutation({
      mutationKey: ['AuthQuery-login'],
      mutationFn: AuthApi.login,
      ...args?.options,
    });
  };

  static useRegister = args => {
    return useMutation({
      mutationKey: ['AuthQuery-register'],
      mutationFn: AuthApi.register,
      ...args?.options,
    });
  };
}
