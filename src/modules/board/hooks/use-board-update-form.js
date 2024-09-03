import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { BoardQuery } from '../queries/board-query';
import { format } from 'date-fns/format';
import { useToast } from '../../../libs/shadcn-ui/components/use-toast';

export const useBoardUpdateForm = props => {
  const { board, onSuccess } = props;

  const { toast } = useToast();

  const schema = object({
    title: string().required('Title is required'),
    startDate: string()
      .required('Start date is required')
      .transform(currentValue => (currentValue ? format(currentValue, 'yyyy-MM-dd') : undefined)),
    endDate: string()
      .required('End date is required')
      .transform(currentValue => (currentValue ? format(currentValue, 'yyyy-MM-dd') : undefined)),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    resetField,
    setValue,
  } = form;

  const onReset = () => {
    resetField('title');
    resetField('startDate');
    resetField('endDate');
  };

  const onInit = title => {
    if (!board) return;

    setValue('title', board.title);
    setValue('startDate', board.startDate);
    setValue('endDate', board.endDate);
  };

  const mutation = BoardQuery.useUpdate();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { id: board.id, payload: data },
      {
        onSuccess: data => {
          onSuccess(data);

          toast({
            title: 'Success',
            description: 'Board updated successfully.',
          });
        },
        onError: error => {
          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Failed to update board. Please try again.',
          });
        },
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
