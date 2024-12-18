'use client';
import { signIn } from '@/services/auth/signin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignIn() {
  // Form validation schema
  const formSchema = z.object({
    email: z.string().email({
      message: 'Email must be a valid email address.'
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    })
  });

  type FormValues = z.infer<typeof formSchema>;

  // React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  // React Query mutation
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      // Handle successful login here
      console.log('Login successful:', data);
    },
    onError: (error) => {
      // Handle login error here
      console.error('Login failed:', error);
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input type="email" {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <input type="password" {...register('password')} placeholder="Password" className="w-full p-2 border rounded" />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isPending} className="w-full p-2 bg-blue-500 text-white rounded">
        {mutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
