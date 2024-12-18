import { config } from '@/lib/config';

export const fetchDistricts = async () => {
  const response = await fetch(`${config.apiUrl}/districts`);
  if (!response.ok) throw new Error('Failed to fetch districts');
  return response.json();
};
