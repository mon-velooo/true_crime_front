'use client';
import { useState, useRef, useCallback, Suspense } from 'react';

import { config } from '@/lib/config';
import { fetchCrimes } from '@/services/crimes/fetchCrimes';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useSuspenseQuery } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import Map, { FullscreenControl, Marker, GeolocateControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Pin = ({ size = 20, color = '#313131', active }) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      className={`cursor-pointer stroke-none transition ease-in duration-200 ${active ? 'transform scale-170' : ''}`}
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <circle cx="12" cy="12" r="10" fill="white" />
      <circle cx="12" cy="12" r="8" fill={active ? 'red' : color} />
    </svg>
  );
};

const MapContent = () => {
  const defaultLong = -74.006;
  const defaultLat = 40.7128;
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: defaultLong,
    latitude: defaultLat,
    zoom: 12
  });

  const { data: crimes } = useSuspenseQuery({
    queryKey: ['crimes'],
    queryFn: fetchCrimes
  });

  // NYC Bounds for geocoder restriction
  const nycBounds: [number, number, number, number] = [-74.25909, 40.477399, -73.700272, 40.917577];

  const initializeGeocoder = useCallback(() => {
    if (!mapRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: config.mapbox.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
      placeholder: 'Search in NYC'
    });

    mapRef.current.addControl(geocoder);
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      mapStyle={config.mapbox.mapStyle}
      style={{ width: '100%', height: '100%' }}
      mapboxAccessToken={config.mapbox.accessToken}
      maxBounds={nycBounds}
      onLoad={initializeGeocoder}
    >
      <FullscreenControl position="top-left" />
      <GeolocateControl position="top-left" fitBoundsOptions={{ maxZoom: 15 }} trackUserLocation={true} />

      {crimes.crimes.slice(0, 20).map((crime) => (
        <Marker key={crime.id} longitude={crime.longitude} latitude={crime.latitude} anchor="bottom">
          <Pin active={true} />
        </Marker>
      ))}
    </Map>
  );
};

export default function MapView({ className }: { className: string }) {
  return (
    <div className={className}>
      Content in the component
      <Suspense
        fallback={<div className="flex items-center justify-center h-full bg-gray-800 text-white">Loading...</div>}
      >
        <MapContent />
      </Suspense>
      Rest of the component
    </div>
  );
}
