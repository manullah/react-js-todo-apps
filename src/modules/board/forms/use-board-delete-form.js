import { BoardQuery } from '../queries/board-query';

export const useBoardDeleteForm = props => {
  const { onSuccess } = props;

  const mutation = BoardQuery.useDelete();

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
