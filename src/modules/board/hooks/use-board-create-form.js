import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { BoardQuery } from '../queries/board-query';
import { format } from 'date-fns/format';
import { useToast } from '../../../libs/shadcn-ui/components/use-toast';

export const useBoardCreateForm = props => {
  const { onSuccess } = props;

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
      startDate: '',
      endDate: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    resetField,
  } = form;

  const onReset = () => {
    resetField('title');
    resetField('startDate');
    resetField('endDate');
  };

  const mutation = BoardQuery.useCreate();

  const isLoading = mutation.isPending || isSubmitting;

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(
      { payload: data },
      {
        onSuccess: data => {
          onSuccess(data);

          toast({
            title: 'Success',
            description: 'Board created successfully.',
          });
        },
        onError: error => {
          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Failed to create board. Please try again.',
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
  };
};
