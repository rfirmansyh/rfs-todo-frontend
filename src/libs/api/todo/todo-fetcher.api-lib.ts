import type { TApiConfigParams } from '@/configs/api.config';
import {
  apiDelete,
  apiGet, apiPatch, apiPost 
} from '@/libs/utils/api.util-lib';
import { TODO_API } from './todo-constant.api-lib';

export const findAllTodo = async (params?: TApiConfigParams) => apiGet({
  url: TODO_API.findAll,
  ...params
});

export const findOneTodo = async (id: string, params?: TApiConfigParams) => apiGet({
  url: TODO_API.findOne(id),
  ...params
});

export const createTodo = async (params?: TApiConfigParams) => apiPost({
  url: TODO_API.create,
  ...params
});

export const updateTodo = async (id: string, params?: TApiConfigParams) => apiPatch({
  url: TODO_API.update(id),
  ...params
});

export const deleteTodo = async (id: string, params?: TApiConfigParams) => apiDelete({
  url: TODO_API.delete(id),
  ...params
});
