'use client';

import {
  type ChangeEventHandler, Fragment, useCallback, useMemo, useRef 
} from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { replace } from 'lodash';
import {
  CircleX, LoaderCircle, Upload 
} from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/atoms/button';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/atoms/card';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Textarea } from '@/components/atoms/textarea';
import { APP } from '@/constants/app.constant';
import type { TActionTodoSchema } from '../../todos/_types';

type TFormTodoAction = {
  form: UseFormReturn<TActionTodoSchema>;
  isLoadingFile?: boolean;
  onUpload(file: File): void;
  onDeleteFile(file_name: string): void;
  onSubmitCallback(values: TActionTodoSchema): void;
}
const FormTodoAction = ({
  form,
  isLoadingFile = true,
  onUpload,
  onDeleteFile,
  onSubmitCallback
}: TFormTodoAction) => {
  const t = useTranslations();

  const inputFileRef = useRef<HTMLInputElement>(null!);

  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = form;

  const bannerUrl = watch('banner_url');

  const handleChangeUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      onUpload(file);
    }
  };
  const handlePickUpload = () => {
    inputFileRef.current.click();
  };
  const handleDeleteImg = useCallback(() => {
    if (bannerUrl) {
      const file_name = replace(bannerUrl, new RegExp(APP.IMAGE_BUCKET, 'g'), '');
      onDeleteFile(file_name);
    }
  }, [bannerUrl, onDeleteFile]);

  const renderImg = useMemo(() => {
    if (bannerUrl) {
      return (
        <Fragment>
          <div className="absolute right-2 top-2 z-10">
            <Button size="icon" variant="ghost" onClick={handleDeleteImg}>
              <CircleX />
            </Button>
          </div>
          <Image
            fill
            alt="Product image"
            className="aspect-square w-full rounded-md object-contain"
            src={bannerUrl}
            style={{ objectFit: 'contain'}}
          />
        </Fragment>
      );
    }
    return (
      <Image
        fill
        alt="Product image"
        className="aspect-square w-full rounded-md object-contain"
        src="/assets/illustrations/img-placeholder.svg"
        style={{ objectFit: 'contain'}}
      />
    );
  }, [bannerUrl, handleDeleteImg]);

  return (
    <form onSubmit={handleSubmit(onSubmitCallback)}>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card
            className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
          >
            <CardHeader>
              <CardTitle>Todo Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <input 
                  type="file" 
                  ref={inputFileRef} 
                  className="hidden" 
                  onChange={handleChangeUpload}
                />
                <div className="relative flex h-[252px] items-center justify-center overflow-hidden rounded-sm bg-primary/10 object-cover text-primary/50">
                  {isLoadingFile 
                    ? <LoaderCircle className="size-12 animate-spin" />
                    : renderImg}
                </div>
                <button 
                  type="button" 
                  className="flex w-full items-center justify-center rounded-md border border-dashed py-2"
                  disabled={isLoadingFile || isSubmitting}
                  onClick={handlePickUpload}
                >
                  <Upload className="size-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
          <Card className="mb-1">
            <CardHeader>
              <CardTitle>Data Todo</CardTitle>
              <CardDescription>
                Atur aktifitasmu pada Data Todo!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="eg: Clean the house"
                    {...register('title')}
                  />
                  {errors.title && (
                    <div className="text-xs text-red-500">{errors.title.message}</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Description</Label>
                  <Textarea
                    id="content"
                    placeholder="Make sure i've cleaned the house before my mom comes."
                    className="min-h-[160px]"
                    {...register('content')}
                  />
                  {errors.content && (
                    <div className="text-xs text-red-500">{errors.content.message}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="hidden items-center gap-4 md:ml-auto md:flex">
            <Button variant="outline">
              { t('common.discard') }
            </Button>
            <Button type="submit" disabled={isSubmitting}>Save Todo</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTodoAction;