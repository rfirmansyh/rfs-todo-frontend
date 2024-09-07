'use client';

import {
  Fragment, useCallback, useMemo, 
  useState
} from 'react';
import {
  usePathname, useRouter, useSearchParams 
} from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import TodoItem from '@/app/dashboard/user/_components/TodoItem/TodoItem';
import AlertDialogConfirmation from '@/components/molecules/AlertDialog/AlertDialogConfirmation';
import { deleteTodo } from '@/libs/api/todo/todo-fetcher.api-lib';
import { useFindAllTodo, useFindOneTodo } from '@/libs/api/todo/todo-query.api-lib';
import type { TSTodo } from '@/types/server/todo.server-type';
import ModalTodoDetail from '../_components/Modal/ModalTodoDetail';

const TodosAllPage = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [selectedDeletedId, setSelectedDeletedId] = useState('');

  const openedDetailId = useMemo(() => searchParams.get('open'), [searchParams]);

  const { data: dataAllTodo, isFetching: isFetchingAllTodo, refetch: refetchAllTodo } = useFindAllTodo();
  const { data: dataOneTodo, isFetching: isFetchingOneTodo, refetch: refetchOneTodo } = useFindOneTodo({
    id: openedDetailId,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteTodo(id)
  });

  const handleClickItem = useCallback(async (todo: TSTodo) => {
    router.replace(`${pathName}?open=${todo.id}`);
    refetchOneTodo();
  }, [pathName, router, refetchOneTodo]);
  const handleClickDeleteItem = useCallback((todo: TSTodo) => {
    setOpenConfirmationDelete(true);
    setSelectedDeletedId(todo.id);
  }, []);
  const handleConfirmDeleteItem = useCallback(async () => {
    await mutateAsync(selectedDeletedId);
    await refetchAllTodo();
    setOpenConfirmationDelete(false);
  }, [selectedDeletedId, mutateAsync, refetchAllTodo]);
  const handleOpenChange = useCallback(() => {
    router.replace(pathName);
  }, [pathName, router]);

  return (
    <Fragment>
      <section>
        <div className="grid grid-cols-3 gap-4">
          {dataAllTodo?.data?.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onClickDetail={() => handleClickItem(todo)} 
              onClickDelete={() => handleClickDeleteItem(todo)}
            />
          ))}
        </div>
      </section>

      <ModalTodoDetail 
        todo={dataOneTodo?.data} 
        open={!!openedDetailId} 
        loading={isFetchingOneTodo}
        onOpenChange={handleOpenChange} 
      />

      <AlertDialogConfirmation 
        variant="delete"
        open={openConfirmationDelete}
        loading={isPending || isFetchingAllTodo}
        onOpenChange={setOpenConfirmationDelete}
        onConfirm={handleConfirmDeleteItem}
      />
    </Fragment>
  );
};

export default TodosAllPage;