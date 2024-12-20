import { config } from "@/lib/config";
import {
  ApiCrimeByDayData,
  ApiCrimeByDayStatsData,
  CrimeByDayStatsData,
  GraphsParams,
} from "@/types/graphs";
const mapDayGroup = (
  apiCrimeByDayData: ApiCrimeByDayData[],
  total: number,
  average: number,
  numberOfDays: number
): CrimeByDayStatsData => {
  return {
    stats: apiCrimeByDayData.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      crimes: item.crimeCount,
      average: average,
    })),
    total,
    average,
    numberOfDays,
  };
};

export const fetchCrimesByDays = async (
  params?: GraphsParams
): Promise<CrimeByDayStatsData> => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const response = await fetch(
    `${config.apiUrl}/graphs/crimesGroupByDayCount${queryString}`
  );

  if (!response.ok) throw new Error("Failed to fetch crimes by days");

  const data: ApiCrimeByDayStatsData = await response.json();
  return mapDayGroup(data.stats, data.total, data.average, data.numberOfDays);
};
