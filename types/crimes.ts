export interface Viewport {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface Crime {
  id: string;
  longitude: number;
  latitude: number;
  // add other crime properties
}

export interface CrimesResponse {
  crimes: Crime[];
}
