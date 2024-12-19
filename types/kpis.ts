export interface KpisParams {
  rangeStartDate?: string;
  rangeEndDate?: string;
}

export interface ApiKpiData {
  title: string;
  value: number;
  type: "number" | "percent";
}

export interface KpiData {
  title: string;
  description: string;
}
