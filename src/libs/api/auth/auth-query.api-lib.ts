import type { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { TQueryParams, TRes } from '@/types/app/common.type';
import type { TSUser } from '@/types/server/user.server-type';
import { me } from './auth-fetcher.api-lib';

export const useMe = (params?: TQueryParams<any>) => {
  const { key = 'me', deps, fnParams, options } = params || {};

  return useQuery<TRes<TSUser>, AxiosError>({
    queryKey: deps ? [key, deps] : [key],
    queryFn: ({ signal }) => me({ params: fnParams, signal }),
    ...options,
  });
};