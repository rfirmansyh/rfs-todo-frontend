import qs from 'qs';
import { apiConfig, type TApiRequestParams } from '@/configs/api.config';

export const apiGet = (props: TApiRequestParams): any => {
  const { url, params, ...rest } = props;

  return apiConfig({ ...rest }).get<any>(url, {
    params,
    ...rest,
  });
};

export const apiPost = (props: TApiRequestParams): any => {
  const { url, data, ...rest } = props;

  return apiConfig({ ...rest }).post(url, data, { ...rest });
};

export const apiPatch = (props: TApiRequestParams): any => {
  const { url, data, ...rest } = props;

  return apiConfig({ ...rest }).patch(url, data, { ...rest });
};

export const apiPut = (props: TApiRequestParams): any => {
  const { url, data, ...rest } = props;

  return apiConfig({ ...rest }).put(url, qs.stringify(data), { ...rest });
};

export const apiDelete = (props: TApiRequestParams): any => {
  const { url, ...rest } = props;

  return apiConfig({ ...rest }).delete(url, { ...rest });
};