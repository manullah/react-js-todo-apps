import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { AuthQuery } from '../queries/auth-query';
import { useAuthContext } from './use-auth-context';

export const useAuthLoginForm = props => {
  const { onSuccess } = props;

  const { onSaveToken } = useAuthContext();

  const schema = object({
    email: string().required('Email is required').email('Email must be a valid email address'),
    password: string().required('Password is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const mutation = AuthQuery.useLogin();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { payload: data },
      {
        onSuccess: data => {
          onSuccess(data);

          onSaveToken(data.token);
        },
        onError: error => {
          setError('email', {
            message: error.message,
          });
        },
      }
    );
  });

  return {
    form,
    isLoading,
    onSubmit,
  };
};
