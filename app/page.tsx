'use client';
import { Container } from '@/components/layout/Container/Container';
import MapView from '@/components/MapView/MapView';

export default function Home() {
  return (
    <>
      <Container>
        <h1 className="flex align-center pt-[1rem] justify-center">True crime</h1>
        <MapView />
      </Container>
    </>
  );
}
