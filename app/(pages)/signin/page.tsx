'use client';
import { useEffect, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast"
import image from '@/assets/images/illustration.avif';
import AuthForm from '@/components/form/authForm/AuthForm';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/services/auth/signin';

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function SignIn() {
  const { toast } = useToast();
  // const router = useRouter();
  // const { isAuthenticated, role, signIn: authSignIn } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffect(() => {
  //   if (!isAuthenticated) return;

  //   if (role === 'user') return router.push('/profile');

  //   router.push('/admin');
  // }, [isAuthenticated, role, router]);

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // authSignIn(data.username, data.email, data.role, data.token, data.id);
      toast({
        title: 'Sign in successful',
        description: `Welcome back, ${data.email}!`,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: `Error: ${error instanceof Error ? error.message : error}`,
      });
    },
  });

  const onError = useCallback(
    (errors: FormErrors) => {
      Object.values(errors).forEach((error) => {
        toast({
          variant: 'destructive',
          title: 'Form submission failed',
          description: error.message,
        });
      });
    },
    [toast]
  );

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <AuthForm<FormValues>
      title="Sign In"
      description="Enter your email and password to sign in"
      fields={[
        {
          label: 'Email',
          type: 'email',
          id: 'email',
          placeholder: 'johndoe@gmail.com',
          name: 'email',
        },
        {
          label: 'Password',
          type: 'password',
          id: 'password',
          placeholder: '',
          name: 'password',
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={mutation.isLoading}
      image={"image"}
      buttonText="Sign In"
      redirectText="Don't have an account? "
      redirectButton="Sign up"
      redirectLink="/signup"
    />
  );
}