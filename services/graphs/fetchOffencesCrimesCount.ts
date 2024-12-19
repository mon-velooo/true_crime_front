import { config } from "@/lib/config";

interface OffencesCrimesCount {
  rangeDate: string[];
}

export const fetchOffencesCrimesCount = async (params?: OffencesCrimesCount) => {
  const rangeStartDate = params.rangeDate[0].split('T')[0];
  const rangeEndDate = params.rangeDate[1].split('T')[0];

  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: rangeStartDate || '',
        rangeEndDate: rangeEndDate || ''
      }).toString()}`
    : '';

  const responseString = `${config.apiUrl}/graphs/offencesCrimesCount/${queryString}`;

  const response = await fetch(responseString);
  if (!response.ok) throw new Error("Failed to fetch offences crimes count");
  return response.json();
};