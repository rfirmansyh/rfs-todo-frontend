import React, { Fragment } from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog, DialogContent, DialogDescription,
  DialogTitle
} from '@/components/atoms/dialog';
import { Skeleton } from '@/components/atoms/skeleton';
import type { TSTodo } from '@/types/server/todo.server-type';
import TodoBanner from '../TodoBanner/TodoBanner';

type TModalTodoDetailProps = {
  loading?: boolean;
  todo?: TSTodo | null;
} & DialogProps

const Loader = () => (
  <Fragment>
    <Skeleton className="h-[18px] w-[180px]"></Skeleton>
    <Skeleton className="my-2 h-[144px] w-full"></Skeleton>
    <DialogDescription>
      <Skeleton className="mb-2 h-[16px] w-full"></Skeleton>
      <Skeleton className="h-[16px] w-[180px]"></Skeleton>
    </DialogDescription>
  </Fragment>
);

const ModalTodoDetail = ({
  loading,
  todo,
  ...rest
}: TModalTodoDetailProps) => (
  <Dialog {...rest}>
    <DialogContent>
      {loading 
        ? <Loader /> 
        : <Fragment>
          <DialogTitle>{todo?.title ?? ''}</DialogTitle>
          <div className="my-2">
            <TodoBanner banner_url={todo?.banner_url} />
          </div>
          <DialogDescription>{todo?.content ?? ''}</DialogDescription>
        </Fragment>
      }
    </DialogContent>
  </Dialog>
);

export default ModalTodoDetail;