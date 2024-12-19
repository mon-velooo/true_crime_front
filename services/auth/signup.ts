import { config } from '@/lib/config';

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${config.apiUrl}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Sign up failed');
  }

  return response.json();
};
