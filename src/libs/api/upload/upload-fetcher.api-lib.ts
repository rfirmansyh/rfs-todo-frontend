import type { TApiConfigParams } from '@/configs/api.config';
import {
  apiDelete,
  apiPost 
} from '@/libs/utils/api.util-lib';
import { UPLOAD_API } from './upload-constant.api-lib';

export const uploadFile = async (params?: TApiConfigParams) => apiPost({
  isFormData: true,
  url: UPLOAD_API.upload,
  ...params
});

export const deleteFile = async (params?: TApiConfigParams) => apiDelete({
  url: UPLOAD_API.delete,
  ...params
});
