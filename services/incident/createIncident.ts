import { config } from "@/lib/config";

export interface CreateIncidentDTO {
  latitude: number;
  longitude: number;
  description: string;
}

export const createIncident = async (
  data: CreateIncidentDTO
): Promise<void> => {
  const response = await fetch(`${config.apiUrl}/reportings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create incident");
  }

  return response.json();
};
