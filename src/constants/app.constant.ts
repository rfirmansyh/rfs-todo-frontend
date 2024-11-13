import { ENV_PUBLIC } from './env.constant';

export const APP = {
  IMAGE_BUCKET: ENV_PUBLIC.NEXT_PUBLIC_BUCKET_URL
};

export const APP_COOKIE_KEY = {
  TOKEN: 'accessToken'
};
