import { config } from '@/lib/config';

export const signIn = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${config.apiUrl}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error('Sign in failed');
  }

  return response.json();
};
