'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/atoms/button';
import { APP_ROUTES } from '@/constants/routes.constant';
import { createTodo } from '@/libs/api/todo/todo-fetcher.api-lib';
import { deleteFile, uploadFile } from '@/libs/api/upload/upload-fetcher.api-lib';
import FormTodoAction from '../../_components/Form/FormTodoAction';
import { actionTodoSchema, type TActionTodoSchema } from '../_types';

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type TCreateTodoSchema = z.infer<typeof createTodoSchema>;

const TodoCreatePage = () => {
  const t = useTranslations();
  const router = useRouter();

  // FORMS
  const form = useForm<TActionTodoSchema>({
    resolver: zodResolver(actionTodoSchema)
  });
  const { setValue } = form;

  // HANDLER
  const handleSubmitCallback = async (data: TCreateTodoSchema) => {
    try {
      const res = await createTodo({ data });

      if (res?.success) {
        toast.success('Todo has been successfully created!');
        router.push(APP_ROUTES.dashboard.user.todos.all.page);
        return;
      }

      throw new Error('Failed to create a todo!');
    } catch (err: any) {
      toast.error(err?.message ?? 'Internal server error');
    }
  };

  const { 
    isPending: isPendingDeleteFile, 
    mutate: mutateDeleteFile
  } = useMutation({
    mutationFn: (file_name: string) => deleteFile({ data: { file_name } }),
    onError() {
      toast.error('Delete file failed');
    },
    async onSuccess() {
      setValue('banner_url', '');
      toast.success('File succesfully deleted');
    },
  });
  const { 
    isPending: isPendingUploadFile, 
    mutate: mutateUploadFile
  } = useMutation({
    mutationFn: (file: File) => uploadFile({ data: { file } }),
    onError() {
      toast.error('Upload file failed');
    },
    async onSuccess(data) {
      if (data.data.file_url) {
        setValue('banner_url', data.data.file_url);
        toast.success('File succesfully uploaded');
      }
    },
  });

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="size-7">
          <ChevronLeft className="size-4" />
          <span className="sr-only">{ t('common.back') }</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          { t('routes.dashboard.user.todos.create.page') }
        </h1>
      </div>

      <FormTodoAction 
        form={form} 
        isLoadingFile={isPendingDeleteFile || isPendingUploadFile}
        onSubmitCallback={handleSubmitCallback} 
        onDeleteFile={mutateDeleteFile}
        onUpload={mutateUploadFile}
      />
    </div>
  );
};

export default TodoCreatePage;