import { config } from '@/lib/config';

interface fetchDistrictsProps {
  rangeDate: string[];
}

export const fetchDistricts = async (params?: fetchDistrictsProps) => {
  const rangeStartDate = params.rangeDate[0].split('T')[0];
  const rangeEndDate = params.rangeDate[1].split('T')[0];

  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: rangeStartDate || '',
        rangeEndDate: rangeEndDate || ''
      }).toString()}`
    : '';

  const responseString = `${config.apiUrl}/graphs/topCrimesCountByDistrict${queryString}`;

  const response = await fetch(responseString);
  if (!response.ok) throw new Error('Failed to fetch districts');
  return response.json();
};