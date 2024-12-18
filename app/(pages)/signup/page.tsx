'use client';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import image from '@/assets/images/illustration.avif';
import AuthForm from '@/components/form/authForm/AuthForm';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/auth/signup';

type FormErrors = Record<string, { message?: string }>;

const formSchema = z
  .object({
    email: z.string().email({
      message: 'Email must be a valid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast({
        title: 'Sign up successful',
        description: `Welcome, ${data.email}!`,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
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
      title="Sign Up"
      description="Enter your email and password to sign up"
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
        {
          label: 'Confirm Password',
          type: 'password',
          id: 'confirmPassword',
          placeholder: '',
          name: 'confirmPassword',
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={mutation.isLoading}
      image={"image"}
      buttonText="Sign Up"
      redirectText="Already have an account? "
      redirectButton="Sign In"
      redirectLink="/signin"
    />
  );
}
