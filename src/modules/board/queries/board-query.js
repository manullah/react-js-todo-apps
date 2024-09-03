import { useMutation, useQuery } from '@tanstack/react-query';

import { BoardApi } from '../apis/board-api';

// ----------------------------------------------------------------------

export class BoardQuery {
  static useGetAll = args => {
    return useQuery({
      queryKey: ['BoardQuery-getAll'],
      queryFn: BoardApi.getAll,
      ...args?.options,
    });
  };

  static useGetDetails = args => {
    return useQuery({
      enabled: !!args?.id,
      queryKey: ['BoardQuery-getDetails'],
      queryFn: BoardApi.getDetails,
      ...args?.options,
    });
  };

  static useCreate = args => {
    return useMutation({
      mutationKey: ['BoardQuery-create'],
      mutationFn: BoardApi.create,
      ...args?.options,
    });
  };

  static useUpdate = args => {
    return useMutation({
      mutationKey: ['BoardQuery-update'],
      mutationFn: BoardApi.update,
      ...args?.options,
    });
  };

  static useDelete = args => {
    return useMutation({
      mutationKey: ['BoardQuery-delete'],
      mutationFn: BoardApi.delete,
      ...args?.options,
    });
  };
}
