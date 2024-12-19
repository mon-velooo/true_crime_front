"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import EventActivity from "../eventActivity/EventActivity";
import MapView from "../mapView/MapView";
import { fetchCrimes } from "@/services/crimes/fetchCrimes";
import type { Viewport, Crime } from "@/types/crimes";
import { useAuth } from "@/providers/AuthProvider";
import { Marker } from "react-map-gl";
import Pin from "../mapView/Pin";

export default function MapContainer({ className }: { className: string }) {
  const { user } = useAuth();

  const [viewport, setViewport] = useState<Viewport>({
    longitude: -73.955242,
    latitude: 40.72061,
    zoom: 12,
  });

  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);
  const [hoveredCrime, setHoveredCrime] = useState<Crime | null>(null);

  const [debouncedViewport, setDebouncedViewport] = useState(viewport);
  const previousPinsRef = useRef(null);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedViewport(viewport);
    }, 1000);
    return () => clearTimeout(handler);
  }, [viewport]);

  useEffect(() => {
    if (selectedCrime) {
      setViewport({
        ...viewport,
        longitude: selectedCrime.longitude,
        latitude: selectedCrime.latitude,
        zoom: 15,
      });
    }
  }, [selectedCrime]);

  const {
    data: crimes,
    isFetching,
    previousData,
  } = useQuery({
    queryKey: [
      "crimes",
      debouncedViewport.longitude,
      debouncedViewport.latitude,
    ],
    queryFn: () =>
      fetchCrimes(
        {
          longitude: debouncedViewport.longitude,
          lattitude: debouncedViewport.latitude,
          zoom: debouncedViewport.zoom,
          startDate: "2024-03-08",
        },
        user?.token
      ),
    enabled: !!user?.token,
    initialData: { crimes: [] }
  });


  const pins = useMemo(() => {
    const currentData = isFetching ? previousData : crimes;
    const markers = currentData?.crimes?.map((crime) => (
      <Marker
        key={`marker-${crime.id}`}
        longitude={crime.longitude}
        latitude={crime.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setSelectedCrime(crime);
        }}
      >
        <Pin
          active={
            crime.id === selectedCrime?.id || crime.id === hoveredCrime?.id
          }
        />
      </Marker>
    ));

    if (!markers) {
      return previousPinsRef.current;
    }

    previousPinsRef.current = markers;
    return markers;
  }, [crimes, hoveredCrime, selectedCrime]);

  return (
    <>
      <MapView
        className={className}
        viewport={viewport}
        setViewport={setViewport}
        pins={pins}
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
