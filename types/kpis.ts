export interface KpisParams {
  rangeStartDate?: string;
  rangeEndDate?: string;
}

export interface ApiKpiData {
  title: string;
  value: number;
  type: "number" | "percent";
}

export interface ApiKpiSecurityFeelingData {
  crimeRate: number;
  securityFeeling: number;
  insecurityFeeling: number;
}

export interface KpiData {
  title: string;
  description: string;
}

export interface KpiSecurityFeelingData {
  crimeRate: string;
  securityRate: number;
  insecurityRate: number;
}
