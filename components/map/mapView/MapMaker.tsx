'use client';
import React from 'react';
import { Marker } from 'react-map-gl';
import type { Crime, CrimesResponse } from '@/types/crimes';
import Pin from './Pin';

interface MapMakerProps {
  crimes: CrimesResponse;
  selectedCrime: Crime | null;
  hoveredCrime: Crime | null;
  onCrimeSelect: (crime: Crime | null) => void;
  onCrimeHover: (crime: Crime | null) => void;
}

export default function MapMaker({ crimes, selectedCrime, hoveredCrime, onCrimeSelect, onCrimeHover }: MapMakerProps) {
  if (!crimes?.crimes) return null;

  return (
    <>
      {crimes.crimes.map((crime) => (
        <Marker
          key={crime.id}
          longitude={crime.longitude}
          latitude={crime.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onCrimeSelect(crime);
          }}
          onMouseEnter={() => onCrimeHover(crime)}
          onMouseLeave={() => onCrimeHover(null)}
        >
          <Pin active={crime.id === selectedCrime?.id || crime.id === hoveredCrime?.id} />
        </Marker>
      ))}
    </>
  );
}
