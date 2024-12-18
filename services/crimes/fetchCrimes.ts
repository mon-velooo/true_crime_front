import { config } from '@/lib/config';

export const fetchCrimes = async () => {
  const response = await fetch(`${config.apiUrl}/crimes`);
  if (!response.ok) throw new Error('Failed to fetch crimes');
  return response.json();
};
