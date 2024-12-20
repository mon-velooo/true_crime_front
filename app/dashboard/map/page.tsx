import MapContainer from '@/components/map/mapContainer/MapContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex space-x-4 p-4 h-[calc(100vh-67px)]">
      <Card className="w-1/2" x-chunk="Map vizualisations in real time of NYC crime data">
        <CardHeader>
          <CardTitle>Real time map vizalisations</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">Content</CardContent>
      </Card>
      <Card className="w-1/2 max-h-full" x-chunk="Map vizualisations in real time of NYC crime data">
        <CardHeader>
          <CardTitle>Real time map vizalisations</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <MapContainer className="w-full h-64 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
