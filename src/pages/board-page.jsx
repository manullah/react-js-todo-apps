import { PlusCircle } from 'lucide-react';
import { Button } from '../libs/shadcn-ui/components/button';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';
import { BoardCreateDialog } from '../modules/board/components/BoardCreateDialog';
import { cn } from '../libs/tailwindcss/utils';
import { BoardCard } from '../modules/board/components/BoardCard';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useKanbanMove } from '../modules/board/hooks/use-board-move';

function HomePage() {
  const { boards, queryHook, onDragEnd } = useKanbanMove();
  const { isPending, refetch } = queryHook;

  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center p-6 mb-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Kanban</h1>

          <Button onClick={() => setCreateDialog(true)}>
            <PlusCircle className="mr-2" size={16} /> New
          </Button>
        </div>

        {isPending ? (
          <Loading className="w-full my-6" />
        ) : boards.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center my-6">No items.</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex-1 flex gap-6 overflow-x-auto">
              {boards.map((board, index) => {
                return (
                  <div
                    key={`bord-${board.id}`}
                    className={cn('min-w-96 max-w-96', {
                      'ml-6': index === 0,
                      'mr-6': index === boards.length - 1,
                    })}
                  >
                    <BoardCard
                      board={board}
                      onSuccess={() => {
                        refetch();
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </Layout>

      <BoardCreateDialog
        open={createDialog}
        onOpenChange={setCreateDialog}
        onSuccess={() => {
          refetch();
        }}
      />
    </>
  );
}

export default HomePage;
