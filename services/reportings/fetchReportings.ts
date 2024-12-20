import { config } from "@/lib/config";
import { ApiReportingData, ReportingData } from "@/types/reportings";

const mapReportings = (
  apiReportingData: ApiReportingData[]
): ReportingData[] => {
  return apiReportingData.map((reporting) => ({
    id: reporting.id,
    latitude: reporting.latitude,
    longitude: reporting.longitude,
    status: "Reported",
    description: reporting.description,
  }));
};

export const fetchReportings = async () => {
  const responseMapped = await fetch(`${config.apiUrl}/reportings`).then(
    async (value) => {
      console.log("RESPONSE", value);
      if (!value.ok) throw new Error("Failed to fetch reportings");
      const apiReportingData: ApiReportingData[] = await value.json();
      console.log("RESPONSE MAPPED", mapReportings(apiReportingData));
      return mapReportings(apiReportingData);
    }
  );
  return responseMapped;
};
