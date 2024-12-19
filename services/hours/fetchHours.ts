import { config } from "@/lib/config";
import {
  ApiCrimeByHourData,
  CrimeByHourStatsData,
  GraphsParams,
} from "@/types/graphs";

const mapCrimesByHour = (
  apiCrimeByHourData: ApiCrimeByHourData
): CrimeByHourStatsData => {
  return {
    stats: apiCrimeByHourData.stats,
    average: apiCrimeByHourData.average,
    averagePastTime: apiCrimeByHourData.averagePastTime,
  };
};

export const fetchHours = async (params?: GraphsParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const responseMapped = await fetch(
    `${config.apiUrl}/graphs/crimesGroupByPairHourCount${queryString}`
  ).then(async (value) => {
    console.log("RESPONSE", value);
    if (!value.ok) throw new Error("Failed to fetch crimes by hour");
    const apiCrimeByHourData: ApiCrimeByHourData = await value.json();
    console.log("RESPONSE MAPPED", mapCrimesByHour(apiCrimeByHourData));
    return mapCrimesByHour(apiCrimeByHourData);
  });

  return responseMapped;
};
