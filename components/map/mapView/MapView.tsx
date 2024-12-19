'use client';
import React from 'react';
import Map, { FullscreenControl, GeolocateControl } from 'react-map-gl';
import { config } from '@/lib/config';
import MapMaker from './MapMaker';
import type { Viewport, Crime, CrimesResponse } from '@/types/crimes';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  className: string;
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  crimes: CrimesResponse;
  selectedCrime: Crime | null;
  hoveredCrime: Crime | null;
  onCrimeSelect: (crime: Crime | null) => void;
  onCrimeHover: (crime: Crime | null) => void;
}

export default function MapView({
  className,
  viewport,
  setViewport,
  crimes,
  selectedCrime,
  hoveredCrime,
  onCrimeSelect,
  onCrimeHover
}: MapViewProps) {
  const nycBounds: [number, number, number, number] = [-74.25909, 40.477399, -73.700272, 40.917577];

  return (
    <div className={className}>
      <Map
        initialViewState={viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={config.mapbox.mapStyle}
        mapboxAccessToken={config.mapbox.accessToken}
        maxBounds={nycBounds}
        style={{ borderRadius: '0.5rem' }}
      >
        <FullscreenControl position="top-left" />
        <GeolocateControl position="top-left" fitBoundsOptions={{ maxZoom: 15 }} />

        <MapMaker
          crimes={crimes}
          selectedCrime={selectedCrime}
          hoveredCrime={hoveredCrime}
          onCrimeSelect={onCrimeSelect}
          onCrimeHover={onCrimeHover}
        />
      </Map>
    </div>
  );
}
