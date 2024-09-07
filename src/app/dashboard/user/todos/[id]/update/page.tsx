'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/atoms/button';
import { APP_ROUTES } from '@/constants/routes.constant';
import { updateTodo } from '@/libs/api/todo/todo-fetcher.api-lib';
import { useFindOneTodo } from '@/libs/api/todo/todo-query.api-lib';
import { deleteFile, uploadFile } from '@/libs/api/upload/upload-fetcher.api-lib';
import FormTodoAction from '../../../_components/Form/FormTodoAction';
import { actionTodoSchema, type TActionTodoSchema } from '../../_types';

const TodoUpdatePage = () => {
  const t = useTranslations();
  const { id } = useParams();
  const router = useRouter();

  const { data: dataTodo, refetch: refetchTodo } = useFindOneTodo({
    id: String(id),
  });

  // FORMS
  const form = useForm<TActionTodoSchema>({
    values: {
      banner_url: dataTodo?.data?.banner_url ?? '',
      title: dataTodo?.data.title ?? '',
      content: dataTodo?.data.content ?? '',
    },
    resolver: zodResolver(actionTodoSchema)
  });
  const { setValue, handleSubmit } = form;

  // HANDLER
  const handleSubmitCallback = async (data: TActionTodoSchema, redirect: boolean = true) => {
    try {
      const res = await updateTodo(String(id), { data });

      if (res?.success) {
        toast.success('Todo has been successfully updated!');
        if (redirect) {
          router.push(APP_ROUTES.dashboard.user.todos.all.page);
        }
        return;
      }

      throw new Error('Failed to update todo!');
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
      await handleSubmit((data) => handleSubmitCallback(data, false))();
      await refetchTodo();
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
        await handleSubmit((data) => handleSubmitCallback(data, false))();
        await refetchTodo();
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
          { t('routes.dashboard.user.todos.update.page') }
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

export default TodoUpdatePage;