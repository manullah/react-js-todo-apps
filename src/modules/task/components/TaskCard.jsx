import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { Card, CardHeader } from '../../../libs/shadcn-ui/components/card';
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
import { useTaskDeleteForm } from '../hooks/use-task-delete-form';
import { Loading } from '../../../components/Loading';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../libs/shadcn-ui/components/dropdown';
import { TaskUpdateDialog } from './TaskUpdateDialog';

const TaskCard = props => {
  const { task, onSuccess } = props;

  const { id, name, progressPercentage } = task;

  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { isLoading, onSubmit: handleDelete } = useTaskDeleteForm({
    onSuccess: () => {
      setDeleteDialog(false);
      onSuccess();
    },
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between gap-4 p-4">
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{name}</p>
            <p className="text-sm text-muted-foreground ">{progressPercentage}%</p>
          </div>
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
        </CardHeader>
      </Card>

      <TaskUpdateDialog
        task={task}
        open={updateDialog}
        onOpenChange={setUpdateDialog}
        onSuccess={() => {
          onSuccess();
        }}
      />

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove the Task?</AlertDialogTitle>
            <AlertDialogDescription>Permanently remove this task.</AlertDialogDescription>
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

export { TaskCard };
