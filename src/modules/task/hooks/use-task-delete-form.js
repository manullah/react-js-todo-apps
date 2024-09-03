import { useToast } from '../../../libs/shadcn-ui/components/use-toast';
import { TaskQuery } from '../queries/task-query';

export const useTaskDeleteForm = props => {
  const { onSuccess } = props;

  const { toast } = useToast();

  const mutation = TaskQuery.useDelete();

  const isLoading = mutation.isPending;

  const onSubmit = id => {
    mutation.mutate(
      { id },
      {
        onSuccess: data => {
          onSuccess(data);

          toast({
            title: 'Success',
            description: 'Task deleted successfully.',
          });
        },
        onError: error => {
          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Failed to delete task. Please try again.',
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
