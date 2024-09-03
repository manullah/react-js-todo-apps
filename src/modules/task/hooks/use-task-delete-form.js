import { TaskQuery } from '../queries/task-query';

export const useTaskDeleteForm = props => {
  const { onSuccess } = props;

  const mutation = TaskQuery.useDelete();

  const isLoading = mutation.isPending;

  const onSubmit = id => {
    mutation.mutate(
      { id },
      {
        onSuccess: data => {
          onSuccess(data);
        },
        onError: error => {},
      }
    );
  };

  return {
    isLoading,
    onSubmit,
  };
};
