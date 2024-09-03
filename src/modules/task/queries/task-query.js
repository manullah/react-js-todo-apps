import { useMutation, useQuery } from '@tanstack/react-query';

import { TaskApi } from '../apis/task-api';

// ----------------------------------------------------------------------

export class TaskQuery {
  static useGetAll = args => {
    return useQuery({
      queryKey: ['TaskQuery-getAll'],
      queryFn: TaskApi.getAll,
      ...args?.options,
    });
  };

  static useGetDetails = args => {
    return useQuery({
      enabled: !!args?.id,
      queryKey: ['TaskQuery-getDetails'],
      queryFn: TaskApi.getDetails,
      ...args?.options,
    });
  };

  static useCreate = args => {
    return useMutation({
      mutationKey: ['TaskQuery-create'],
      mutationFn: TaskApi.create,
      ...args?.options,
    });
  };

  static useUpdate = args => {
    return useMutation({
      mutationKey: ['TaskQuery-update'],
      mutationFn: TaskApi.update,
      ...args?.options,
    });
  };

  static useDelete = args => {
    return useMutation({
      mutationKey: ['TaskQuery-delete'],
      mutationFn: TaskApi.delete,
      ...args?.options,
    });
  };

  static useMove = args => {
    return useMutation({
      mutationKey: ['TaskQuery-move'],
      mutationFn: TaskApi.move,
      ...args?.options,
    });
  };
}
