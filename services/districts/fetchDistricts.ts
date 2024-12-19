import { toCamelCase } from "@/components/utils/formatString";
import { config } from "@/lib/config";
import {
  ApiCrimeByDistrictData,
  ApiCrimeByHourData,
  CrimeByDistrictData,
  CrimeByHourStatsData,
  GraphsParams,
} from "@/types/graphs";

// export const fetchDistricts = async (rangeStartDate, rangeEndDate) => {
//   const response = await fetch(
//     `${config.apiUrl}/graphs/topCrimesCountByDistrict?rangeStartDate=${rangeStartDate}&rangeEndDate=${rangeEndDate}`
//   );
//   if (!response.ok) throw new Error("Failed to fetch districts");
//   return response.json();
// };

const mapCrimesByDristrict = (
  apiCrimesByDristrict: ApiCrimeByDistrictData[]
): CrimeByDistrictData[] => {
  return apiCrimesByDristrict.map((apiCrimeByDristrict) => {
    return {
      district: toCamelCase(apiCrimeByDristrict.district.name),
      crimeCount: apiCrimeByDristrict.crimeCount,
      fill: `var(--color-${toCamelCase(apiCrimeByDristrict.district.name)})`,
    };
  });
};

export const fetchDistricts = async (params?: GraphsParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const responseMapped = await fetch(
    `${config.apiUrl}/graphs/topCrimesCountByDistrict${queryString}`
  ).then(async (value) => {
    console.log("RESPONSE", value);
    if (!value.ok) throw new Error("Failed to fetch top crimes by district");
    const apiCrimesByDristrictData: ApiCrimeByDistrictData[] =
      await value.json();
    console.log(
      "RESPONSE MAPPED",
      mapCrimesByDristrict(apiCrimesByDristrictData)
    );
    return mapCrimesByDristrict(apiCrimesByDristrictData);
  });

  return responseMapped;
};
