"use client"
import { Container } from '@/components/layout/Container/Container';
import MapView from '@/components/MapView/MapView';
import Map, { NavigationControl, FullscreenControl } from 'react-map-gl';

export default function Home() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


  return (
    <>
      <Container>
        <h1 className="flex align-center pt-[1rem] justify-center">True crime</h1>    
        <MapView />
      </Container>
    </>
  );
}