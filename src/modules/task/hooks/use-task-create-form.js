import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { TaskQuery } from '../queries/task-query';

export const useTaskCreateForm = props => {
  const { boardId, onSuccess } = props;

  const schema = object({
    name: string().required('Name is required'),
    progressPercentage: number().required('Progress percentage is required').min(0).max(100),
    boardId: string().required('End date is required'),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      progressPercentage: 0,
      boardId,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    resetField,
  } = form;

  const onReset = () => {
    resetField('name');
    resetField('progressPercentage');
    resetField('boardId');
  };

  const mutation = TaskQuery.useCreate();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { payload: data },
      {
        onSuccess: data => {
          onSuccess(data);
        },
        onError: error => {},
      }
    );
  });

  return {
    form,
    isLoading,
    onSubmit,
    onReset,
  };
};
