'use client';

import ImgLogin from '@/public/assets/illustrations/login.svg';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Alert} from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { APP_ROUTES } from '@/constants/routes.constant';
import { login } from '@/libs/api/auth/auth-fetcher.api-lib';
import { useMe } from '@/libs/api/auth/auth-query.api-lib';
import type { TSUserRole } from '@/types/server/user.server-type';

const logincSchema = z.object({
  identity: z.string().min(1, 'Username / Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type TLoginSchema = z.infer<typeof logincSchema>;

const LoginPage = () => {
  const router = useRouter();

  // DATA
  // trigger request check wehter user login exist
  const { data: dataMe } = useMe();

  // FORMS
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<TLoginSchema>({
    values: {
      identity: '',
      password: ''
    },
    resolver: zodResolver(logincSchema)
  });

  // HANDLER
  const handleSubmitCallback = async (data: TLoginSchema) => {
    try {
      const res = await login({ data });

      if (res?.data?.user) {
        const role = res.data.user.role as TSUserRole;

        toast.success('Login successfully !');
        router.push(APP_ROUTES.dashboard[role].page);
        return;
      }

      throw new Error('Login failed');
    } catch (err: any) {
      setError('root', {
        message: err?.message ?? 'Internal server error'
      });
    }
  };

  useEffect(() => {
    if (dataMe?.data?.role) {
      router.push(APP_ROUTES.dashboard[dataMe.data.role].page);
    }
  }, [dataMe]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSubmitCallback)} autoComplete="off">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="identity">Username / Email</Label>
                <Input
                  id="identity"
                  type="text"
                  placeholder="m@example.com"
                  {...register('identity')}
                />
                {errors.identity && (
                  <div className="text-xs text-red-500">{errors.identity.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password')}
                />
                {errors.password && (
                  <div className="text-xs text-red-500">{errors.password.message}</div>
                )}
              </div>

              {errors.root && (
                <Alert variant="destructive" className="text-sm">
                  {errors.root.message}
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={APP_ROUTES.register.page} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-muted lg:flex">
        <div className="relative overflow-hidden lg:size-[450px] xl:size-[700px]">
          <ImgLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;