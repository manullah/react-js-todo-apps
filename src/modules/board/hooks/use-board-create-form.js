import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { BoardQuery } from '../queries/board-query';
import { format } from 'date-fns/format';

export const useBoardCreateForm = props => {
  const { onSuccess } = props;

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
