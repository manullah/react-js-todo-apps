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
import { useTaskCreateForm } from '../hooks/use-task-create-form';

const TaskCreateDialog = props => {
  const { boardId, open, onOpenChange, onSuccess } = props;

  const { form, isLoading, onSubmit, onReset } = useTaskCreateForm({
    boardId,
    onSuccess: data => {
      onSuccess(data);
      onOpenChange(false);
    },
  });

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!open) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>Add a new task to your board.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="progressPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Progress percentage..."
                        {...field}
                      />
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

export { TaskCreateDialog };
