import { config } from '@/lib/config';

export const fetchHours = async (rangeStartDate, rangeEndDate) => {
  const response = await fetch(
    `${config.apiUrl}/graphs/crimesGroupByHourCount?rangeStartDate=${rangeStartDate}&rangeEndDate=${rangeEndDate}`
  );
  if (!response.ok) throw new Error('Failed to fetch crimes by hour');
  return response.json();
};
