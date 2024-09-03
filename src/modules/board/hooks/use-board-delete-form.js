import { useToast } from '../../../libs/shadcn-ui/components/use-toast';
import { BoardQuery } from '../queries/board-query';

export const useBoardDeleteForm = props => {
  const { onSuccess } = props;

  const { toast } = useToast();

  const mutation = BoardQuery.useDelete();

  const isLoading = mutation.isPending;

  const onSubmit = id => {
    mutation.mutate(
      { id },
      {
        onSuccess: data => {
          onSuccess(data);

          toast({
            title: 'Success',
            description: 'Board deleted successfully.',
          });
        },
        onError: error => {
          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Failed to delete board. Please try again.',
          });
        },
      }
    );
  };

  return {
    isLoading,
    onSubmit,
  };
};
