import { config } from "@/lib/config";

interface OffencesCrimesCountParams {
  rangeStartDate: string;
  rangeEndDate: string;
}

export const fetchOffencesCrimesCount = async (
  params: OffencesCrimesCountParams
) => {
  const queryString = `?${new URLSearchParams({
    rangeStartDate: params.rangeStartDate,
    rangeEndDate: params.rangeEndDate,
  }).toString()}`;

  const response = await fetch(
    `${config.apiUrl}/graphs/offencesCrimesCount/${queryString}`
  );
  if (!response.ok) throw new Error("Failed to fetch offences crimes count");
  return response.json();
};
