import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { TaskQuery } from '../queries/task-query';

export const useTaskUpdateForm = props => {
  const { task, onSuccess } = props;

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
      boardId: task.boardId,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    resetField,
    setValue,
  } = form;

  const onReset = () => {
    resetField('name');
    resetField('progressPercentage');
  };

  const onInit = () => {
    if (!task) return null;

    setValue('name', task.name);
    setValue('progressPercentage', task.progressPercentage);
  };

  const mutation = TaskQuery.useUpdate();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { id: task.id, payload: data },
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
    onInit,
  };
};
