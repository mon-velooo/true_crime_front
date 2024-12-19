import { config } from '@/lib/config';

export const fetchDistricts = async (rangeStartDate, rangeEndDate) => {
  const response = await fetch(
    `${config.apiUrl}/graphs/topCrimesCountByDistrict?rangeStartDate=${rangeStartDate}&rangeEndDate=${rangeEndDate}`
  );
  if (!response.ok) throw new Error('Failed to fetch districts');
  return response.json();
};
