import { formatNumber } from "@/components/utils/formatNumber";
import { config } from "@/lib/config";
import {
  KpiSecurityFeelingData,
  ApiKpiData,
  ApiKpiSecurityFeelingData,
  KpiData,
  KpisParams,
} from "@/types/kpis";

const mapKpis = (apiKpiData: ApiKpiData[]): KpiData[] => {
  return apiKpiData.map((kpi) => ({
    title: kpi.title,
    description:
      kpi.type === "percent" ? `${kpi.value}%` : formatNumber(kpi.value),
  }));
};

const mapSecurityFeelingKpi = (
  apiKpiData: ApiKpiSecurityFeelingData
): KpiSecurityFeelingData[] => {
  return [
    {
      crimeRate: `${apiKpiData.crimeRate}`,
      securityRate: apiKpiData.securityFeeling,
      insecurityRate: apiKpiData.insecurityFeeling,
    },
  ];
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

export const fetchSecurityFeeling = async (params?: KpisParams) => {
  const queryString = params
    ? `?${new URLSearchParams({
        rangeStartDate: params.rangeStartDate || "",
        rangeEndDate: params.rangeEndDate || "",
      }).toString()}`
    : "";

  const responseMapped = await fetch(
    `${config.apiUrl}/kpis/securityFeeling${queryString}`
  ).then(async (value) => {
    console.log("RESPONSE", value);
    if (!value.ok) throw new Error("Failed to fetch kpis");
    const apiKpiData: ApiKpiSecurityFeelingData = await value.json();
    console.log("RESPONSE MAPPED", mapSecurityFeelingKpi(apiKpiData));
    return mapSecurityFeelingKpi(apiKpiData);
  });

  return responseMapped;
};
