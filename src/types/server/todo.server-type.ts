import type { TSUser } from './user.server-type';

export type TSTodo = {
  id: string;
  banner_url?: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: TSUser;
}