export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mapbox: {
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    mapStyle: process.env.NEXT_PUBLIC_MAPBOX_MAPSTYLE
  },
  googleMaps: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
} as const;
