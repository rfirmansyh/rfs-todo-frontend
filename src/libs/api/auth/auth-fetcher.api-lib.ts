import type { TApiConfigParams } from '@/configs/api.config';
import { apiGet, apiPost } from '@/libs/utils/api.util-lib';
import type { TRes } from '@/types/app/common.type';
import type { TSUser, TSUserLoginResult } from '@/types/server/user.server-type';
import { AUTH_API } from './auth-constant.api-lib';

export const login = async (params?: TApiConfigParams): Promise<TRes<TSUserLoginResult>> => apiPost({
  url: AUTH_API.login,
  ...params
});

export const logout = async (params?: TApiConfigParams): Promise<TRes<TSUserLoginResult>> => apiPost({
  url: AUTH_API.logout,
  ...params
});

export const register = async (params?: TApiConfigParams): Promise<TRes<TSUser>> => apiPost({
  url: AUTH_API.register,
  ...params
});

export const me = async (params?: TApiConfigParams) => apiGet({
  url: AUTH_API.me,
  ...params
});