import { useEffect, useState } from 'react';
import { BoardQuery } from '../queries/board-query';
import { TaskQuery } from '../../task/queries/task-query';
import { useToast } from '../../../libs/shadcn-ui/components/use-toast';

export const useKanbanMove = () => {
  const [boards, setBoards] = useState([]);

  const { toast } = useToast();

  const queryHook = BoardQuery.useGetAll({});
  const { data, refetch, isFetching } = queryHook;

  useEffect(() => {
    setBoards(data || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const mutation = TaskQuery.useMove({});

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    setBoards(prev => {
      return prev.map(board => {
        if (board.id === destination.droppableId) {
          // Handle the task to destination board

          if (destination.droppableId === source.droppableId) {
            console.log('masuk sini');
            // Handle the task if destination and source is same

            const task = board.task.filter(task => task.id !== draggableId);

            const foundTask = boards
              .find(item => item.id === source.droppableId)
              ?.task.find(item => item.id === draggableId);

            task.splice(destination.index, 0, foundTask);

            return {
              ...board,
              task,
            };
          } else {
            const foundTask = boards
              .find(item => item.id === source.droppableId)
              ?.task.find(item => item.id === draggableId);

            board.task.splice(destination.index, 0, foundTask);

            return board;
          }
        } else if (board.id === source.droppableId) {
          // Handle the task from source board

          return {
            ...board,
            task: board.task.filter(task => task.id !== draggableId),
          };
        }

        return board;
      });
    });

    mutation.mutate(
      {
        payload: { id: draggableId, boardId: destination.droppableId },
      },
      {
        onError: error => {
          refetch();

          toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'Failed to move task. Please try again.',
          });
        },
      }
    );
  };

  return {
    boards,
    queryHook,
    onDragEnd,
  };
};
