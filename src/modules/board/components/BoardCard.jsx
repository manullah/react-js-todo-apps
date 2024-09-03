import { EllipsisVertical, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../libs/shadcn-ui/components/card';
import { Button } from '../../../libs/shadcn-ui/components/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../libs/shadcn-ui/components/alert-dialog';
import { useBoardDeleteForm } from '../hooks/use-board-delete-form';
import { Loading } from '../../../components/Loading';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../libs/shadcn-ui/components/dropdown';
import { BoardUpdateDialog } from './BoardUpdateDialog';
import { TaskCreateDialog } from '../../task/components/TaskCreateDialog';
import { TaskCard } from '../../task/components/TaskCard';

const BoardCard = props => {
  const { board, onSuccess } = props;

  const { id, title, startDate, endDate } = board;
  const tasks = board.task || [];

  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [createTaskDialog, setCreateTaskDialog] = useState(false);

  const { isLoading, onSubmit: handleDelete } = useBoardDeleteForm({
    onSuccess: () => {
      setDeleteDialog(false);
      onSuccess();
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-1.5">{title}</h4>

            <div className="mt-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setUpdateDialog(true)}>
                    <Pencil className="mr-2" size={16} />
                    <span>Update</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
                    <Trash2 className="mr-2" size={16} />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Start:</strong> {startDate}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>End:</strong> {endDate}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center my-6">No items.</p>
          ) : (
            tasks.map(task => {
              return (
                <TaskCard
                  key={`task-${task.id}`}
                  task={task}
                  onSuccess={() => {
                    onSuccess();
                  }}
                />
              );
            })
          )}
        </CardContent>
        <div className="px-3 pb-3">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => setCreateTaskDialog(true)}
          >
            <PlusCircle className="mr-2" size={16} />
            Add
          </Button>
        </div>
      </Card>

      <TaskCreateDialog
        boardId={id}
        open={createTaskDialog}
        onOpenChange={setCreateTaskDialog}
        onSuccess={() => {
          onSuccess();
        }}
      />

      <BoardUpdateDialog
        board={board}
        open={updateDialog}
        onOpenChange={setUpdateDialog}
        onSuccess={() => {
          onSuccess();
        }}
      />

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove the Board?</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently remove a Kanban board and all its tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              size="sm"
              className="w-fit"
              onClick={() => handleDelete(id)}
            >
              {isLoading ? <Loading /> : 'Remove'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { BoardCard };
