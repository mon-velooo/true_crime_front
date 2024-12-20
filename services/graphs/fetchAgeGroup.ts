import { config } from "@/lib/config";
import {
  AgeGroupCrimesStatsData,
  ApiAgeGroupCrimesData,
  GraphsParams,
} from "@/types/graphs";

const mapAgeGroup = (
  apiAgeGroupCrimesData: ApiAgeGroupCrimesData[]
): AgeGroupCrimesStatsData => {
  return {
    stats: apiAgeGroupCrimesData
      .filter((item) => item.ageGroup !== "UNKNOWN")
      .map((item) => {
        return {
          ageRange: item.ageGroup,
          victims: item.victimsCount,
          suspects: item.suspectsCount,
        };
      }),
    extremValue: {
      ageRange: "UNKNOWN",
      victims:
        apiAgeGroupCrimesData.find((item) => item.ageGroup === "UNKNOWN")
          ?.victimsCount || 0,
      suspects:
        apiAgeGroupCrimesData.find((item) => item.ageGroup === "UNKNOWN")
          ?.suspectsCount || 0,
    },
  };
};

export const fetchAgeGroup = async (params?: GraphsParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const responseMapped = await fetch(
    `${config.apiUrl}/graphs/ageGroup${queryString}`
  ).then(async (value) => {
    console.log("RESPONSE", value);
    if (!value.ok) throw new Error("Failed to fetch group age by crimes");
    const apiCrimeByHourData: ApiAgeGroupCrimesData[] = await value.json();
    console.log("RESPONSE MAPPED", mapAgeGroup(apiCrimeByHourData));
    return mapAgeGroup(apiCrimeByHourData);
  });

  return responseMapped;
};
