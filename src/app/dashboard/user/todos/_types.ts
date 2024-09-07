import { z } from 'zod';

export const actionTodoSchema = z.object({
  banner_url: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type TActionTodoSchema = z.infer<typeof actionTodoSchema>;