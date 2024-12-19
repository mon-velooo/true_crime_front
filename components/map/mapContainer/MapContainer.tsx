'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventActivity from '../eventActivity/EventActivity';
import MapView from '../mapView/MapView';
import { fetchCrimes } from '@/services/crimes/fetchCrimes';
import type { Viewport, Crime } from '@/types/crimes';
import { useAuth } from '@/providers/AuthProvider';

export default function MapContainer({ className }: { className: string }) {
  const { user } = useAuth();

  const [viewport, setViewport] = useState<Viewport>({
    longitude: -73.955242,
    latitude: 40.72061,
    zoom: 12
  });

  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);
  const [hoveredCrime, setHoveredCrime] = useState<Crime | null>(null);

  const [debouncedViewport, setDebouncedViewport] = useState(viewport);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedViewport(viewport);
    }, 1000);
    return () => clearTimeout(handler);
  }, [viewport]);

  const { data: crimes, isLoading } = useQuery({
    queryKey: ['crimes', debouncedViewport.longitude, debouncedViewport.latitude],
    queryFn: () =>
      fetchCrimes(
        {
          longitude: debouncedViewport.longitude,
          lattitude: debouncedViewport.latitude,
          zoom: debouncedViewport.zoom,
          startDate: '2024-03-08'
        },
        user?.token
      ),
    enabled: !!user?.token,
    initialData: { crimes: [] }
  });

  return (
    <>
      <MapView
        className={className}
        viewport={viewport}
        setViewport={setViewport}
        crimes={crimes}
        selectedCrime={selectedCrime}
        hoveredCrime={hoveredCrime}
        onCrimeSelect={setSelectedCrime}
        onCrimeHover={setHoveredCrime}
      />
      <EventActivity
        crimes={crimes}
        selectedCrime={selectedCrime}
        hoveredCrime={hoveredCrime}
        onCrimeSelect={setSelectedCrime}
        onCrimeHover={setHoveredCrime}
      />
    </>
  );
}
