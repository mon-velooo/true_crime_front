import { config } from '@/lib/config';

interface CrimeParams {
  longitude?: number;
  lattitude?: number;
  zoom?: number;
  startDate?: string;
}

export const fetchCrimes = async (params?: CrimeParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        longitude: params.longitude?.toString() || '',
        lattitude: params.lattitude?.toString() || '',
        zoomLevel: params.zoom?.toString() || '',
        startDate: params.startDate || ''
      }).toString()}`
    : '';

  const response = await fetch(`${config.apiUrl}/crimes${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch crimes');
  return response.json();
};

export const fetchCrime = async (id: string) => {
  const response = await fetch(`${config.apiUrl}/crimes/${id}`);
  if (!response.ok) throw new Error('Failed to fetch crime');
  return response.json();
};
