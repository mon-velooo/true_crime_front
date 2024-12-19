'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';

export function useAuthQuery<TData, TError>(
  options: Omit<UseQueryOptions<TData, TError>, 'queryFn'> & {
    queryFn: () => Promise<TData>;
  }
) {
  const { user } = useAuth();

  return useQuery<TData, TError>({
    ...options,
    queryFn: async () => {
      const response = await fetch(`${options.queryKey[0]}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: user?.token ? `Bearer ${user.token}` : ''
        }
      });

      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });
}
