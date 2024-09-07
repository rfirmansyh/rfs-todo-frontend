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
import { register as apiRegister } from '@/libs/api/auth/auth-fetcher.api-lib';
import { useMe } from '@/libs/api/auth/auth-query.api-lib';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'], // path of error
});

type TRegisterSchema = z.infer<typeof registerSchema>;

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
  } = useForm<TRegisterSchema>({
    values: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerSchema)
  });

  // HANDLER
  const handleSubmitCallback = async (data: TRegisterSchema) => {
    try {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { confirmPassword, ...submittedData } = data;
      const res = await apiRegister({ data: submittedData });

      if (res?.data?.name) {
        toast.success('Register successfully !');
        router.push(APP_ROUTES.login.page);
        return;
      }

      throw new Error('Register failed');
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="eg: John Doe"
                  {...register('name')}
                />
                {errors.name && (
                  <div className="text-xs text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <div className="text-xs text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="eg: johndoe"
                  {...register('username')}
                />
                {errors.username && (
                  <div className="text-xs text-red-500">{errors.username.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="******"
                  {...register('password')}
                />
                {errors.password && (
                  <div className="text-xs text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Re-enter Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="******"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <div className="text-xs text-red-500">{errors.confirmPassword.message}</div>
                )}
              </div>

              {errors.root && (
                <Alert variant="destructive" className="text-sm">
                  {errors.root.message}
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Sign up now
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href={APP_ROUTES.login.page} className="underline">
              Login
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