"use client";
import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import Map, { FullscreenControl, GeolocateControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { config } from "@/lib/config";
import type { Viewport, Crime, CrimesResponse } from "@/types/crimes";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapViewSkeleton from "./MapViewSkeleton";

interface MapViewProps {
  className: string;
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  crimes: CrimesResponse;
  selectedCrime: Crime | null;
  hoveredCrime: Crime | null;
  pins: React.ReactNode;
  onCrimeSelect: (crime: Crime | null) => void;
  onCrimeHover: (crime: Crime | null) => void;
}

export default function MapView({
  className,
  viewport,
  setViewport,
  pins,
  selectedCrime,
}: MapViewProps) {
  const nycBounds: [number, number, number, number] = [
    -74.25909, 40.477399, -73.700272, 40.917577,
  ];
  const mapRef = useRef(null);

  const initializeGeocoder = useCallback(() => {
    if (!mapRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: config.mapbox.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      bbox: nycBounds,
      placeholder: "Search in NYC",
    });

    mapRef.current.addControl(geocoder);
  }, []);

  useEffect(() => {
    if (selectedCrime && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedCrime.longitude, selectedCrime.latitude],
        zoom: 15,
        duration: 2000,
        essential: true,
      });
    }
  }, [selectedCrime]);

  if (React.Children.count(pins) === 0) return <MapViewSkeleton />;

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        initialViewState={viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={config.mapbox.mapStyle}
        mapboxAccessToken={config.mapbox.accessToken}
        maxBounds={nycBounds}
        onLoad={initializeGeocoder}
        style={{ borderRadius: "0.5rem" }}
      >
        <FullscreenControl position="top-left" />
        {/* <GeolocateControl position="top-left" fitBoundsOptions={{ maxZoom: 15 }} /> */}

        {/* <MapMaker
          crimes={crimes}
          selectedCrime={selectedCrime}
          hoveredCrime={hoveredCrime}
          onCrimeSelect={onCrimeSelect}
          onCrimeHover={onCrimeHover}
        /> */}
        {pins}
      </Map>
    </div>
  );
}
