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

export interface ApiCrimeByDistrictData {
  district: {
    id: number;
    name: string;
  };
  crimeCount: number;
}

export interface CrimeByDistrictData {
  district: string;
  crimeCount: number;
  fill: string;
}

export interface ApiAgeGroupCrimesData {
  ageGroup: string;
  victimsCount: number;
  suspectsCount: number;
}

export interface AgeGroupCrimesData {
  ageRange: string;
  victims: number;
  suspects: number;
}

export interface AgeGroupCrimesStatsData {
  stats: AgeGroupCrimesData[];
  extremValue: AgeGroupCrimesData;
}
