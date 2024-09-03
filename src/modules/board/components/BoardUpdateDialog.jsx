import { useEffect } from 'react';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../libs/shadcn-ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../libs/shadcn-ui/components/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../libs/shadcn-ui/components/form';
import { Input } from '../../../libs/shadcn-ui/components/input';
import { useBoardUpdateForm } from '../forms/use-board-update-form';

const BoardUpdateDialog = props => {
  const { board, open, onOpenChange, onSuccess } = props;

  const { form, isLoading, onSubmit, onReset, onInit } = useBoardUpdateForm({
    board,
    onSuccess: data => {
      onSuccess();
      onOpenChange(false);
    },
  });

  // READ: Reset the form when the dialog is closed
  useEffect(() => {
    if (!open) {
      onReset();
    } else {
      onInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update board</DialogTitle>
          <DialogDescription>Rename your Kanban board.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="sm:justify-start">
              <Button type="submit" disabled={isLoading} className="ml-auto">
                {isLoading ? <Loading /> : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { BoardUpdateDialog };
