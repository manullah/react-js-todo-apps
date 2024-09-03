import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { AuthQuery } from '../queries/auth-query';
import { useToast } from '../../../libs/shadcn-ui/components/use-toast';

export const useAuthRegisterForm = props => {
  const { onSuccess } = props;

  const { toast } = useToast();

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

  const mutation = AuthQuery.useRegister();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { payload: data },
      {
        onSuccess: data => {
          onSuccess(data);

          toast({
            title: 'Success',
            description: 'Registration successful.',
          });
        },
        onError: error => {
          setError('email', {
            message: error.message,
          });

          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Registration failed. Please try again.',
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
