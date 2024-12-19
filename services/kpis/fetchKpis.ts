import { config } from "@/lib/config";
import { ApiKpiData, KpiData, KpisParams } from "@/types/kpis";

const mapKpis = (apiKpiData: ApiKpiData[]): KpiData[] => {
  return apiKpiData.map((kpi) => ({
    title: kpi.title,
    description:
      kpi.type === "percent" ? `${kpi.value}%` : kpi.value.toString(),
  }));
};

export const fetchKpis = async (params?: KpisParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const responseMapped = await fetch(
    `${config.apiUrl}/kpis${queryString}`
  ).then(async (value) => {
    if (!value.ok) throw new Error("Failed to fetch kpis");
    const apiKpiData: ApiKpiData[] = await value.json();
    return mapKpis(apiKpiData);
  });

  return responseMapped;
};
