import type { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { TQueryParams, TRes } from '@/types/app/common.type';
import type { TSTodo } from '@/types/server/todo.server-type';
import { findAllTodo, findOneTodo } from './todo-fetcher.api-lib';

export const useFindAllTodo = (params?: TQueryParams<any>) => {
  const { key = 'findAllTodo', deps, fnParams, options } = params || {};

  return useQuery<TRes<Array<TSTodo>>, AxiosError>({
    queryKey: deps ? [key, deps] : [key],
    queryFn: ({ signal }) => findAllTodo({ params: fnParams, signal }),
    ...options,
  });
};

export type TUseFindOneTodoParams = {
  id?: string | null;
} & TQueryParams
export const useFindOneTodo = (params?: TUseFindOneTodoParams) => {
  const { id, key = 'useFindOneTodo', deps, fnParams, options } = params || {};

  return useQuery<TRes<TSTodo>, AxiosError>({
    queryKey: deps ? [key, id, deps] : [key, id],
    queryFn: ({ signal }) => findOneTodo(id!, { params: fnParams, signal }),
    enabled: !!id,
    ...options,
  });
};
