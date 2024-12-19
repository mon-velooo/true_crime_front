export interface GraphsParams {
  rangeStartDate?: string;
  rangeEndDate?: string;
}

export interface CrimeByHourData {
  hour: string;
  crimeCount: number;
}

export interface CrimeByHourStatsData {
  stats: CrimeByHourData[];
  average: number;
  averagePastTime: number;
}

export interface ApiCrimeByHourData {
  stats: CrimeByHourData[];
  average: number;
  averagePastTime: number;
}
