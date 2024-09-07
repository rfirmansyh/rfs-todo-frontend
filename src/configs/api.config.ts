import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { removeCookie } from 'typescript-cookie';
import { APP_COOKIE_KEY } from '@/constants/app.constant';
import { ENV_PUBLIC } from '@/constants/env.constant';
import { APP_PUBLIC_ROUTES } from '@/constants/routes.constant';


export type TApiConfigParams = AxiosRequestConfig & {
  isFormData?: boolean;
  defaultAxiosResponse?: boolean;
}
export type TApiRequestParams = TApiConfigParams & {
  url: string;
}

export const apiConfig = (params: TApiConfigParams = {}) => {
  const { isFormData, defaultAxiosResponse, ...rest } = params;

  const instance = axios.create({
    baseURL: ENV_PUBLIC.NEXT_PUBLIC_APP_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      ...rest.headers,
    },
    ...rest
  });

  instance.interceptors.request.use((request) => request);
  instance.interceptors.response.use(
    (response) => {
      if (defaultAxiosResponse) {
        return response;
      }
      return response.data;
    },
    (err) => {
      if (err?.response?.status === 401) {
        const isPublicRoute = APP_PUBLIC_ROUTES[window.location.pathname ?? ''] ?? false;

        if (!isPublicRoute) {
          removeCookie(APP_COOKIE_KEY.TOKEN);
          window.location.href = '/login';
        }
      }

      if (err?.response?.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    },
  );

  return instance;
};