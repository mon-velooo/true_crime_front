'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchCrime } from '@/services/crimes/fetchCrimes';
import { getLawCategoryColor } from './EventActivity';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EventDetailProps {
  crimeId: string;
  onBack: () => void;
}

const EventDetailContent = ({ crime, crimeIsLoading }) => {
  if (crimeIsLoading) {
    return <div className="w-full p-8 text-center text-muted-foreground">Loading...</div>;
  }

  if (!crime) {
    return <div className="w-full p-8 text-center text-muted-foreground">No crime found</div>;
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-510px)]">
        <Card className="bg-card-secondary border border-border-secondary rounded-md mb-4">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-lg">{crime?.description || 'N/A'}</h3>
                <p className="text-sm text-muted-foreground">
                  {crime?.offence?.description || 'No description available'}
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className={getLawCategoryColor(crime?.lawCategory?.label || '')}>
                  {crime?.lawCategory?.label || 'Unknown'}
                </Badge>
                <Badge variant="outline" className="ml-2">
                  {crime?.status?.label || 'Unknown'}
                </Badge>
              </div>
            </div>

            <Separator className="bg-muted-foreground" />

            <div className="grid gap-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground">District</p>
                  <p className="font-medium">{crime?.district?.name || 'Unknown'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Location Type</p>
                  <p className="font-medium">
                    {crime?.locationType?.label
                      ? `${crime.locationType.label} (${crime?.locationDescription?.description || 'Unknown'})`
                      : 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Start Time</p>
                  <p className="font-medium">
                    {crime?.start_date && crime?.start_time
                      ? new Date(`${crime.start_date}T${crime.start_time}`).toLocaleString()
                      : 'Unknown'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">End Time</p>
                  <p className="font-medium">
                    {crime?.end_date && crime?.end_time
                      ? new Date(`${crime.end_date}T${crime.end_time}`).toLocaleString()
                      : 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">
                  {crime?.latitude && crime?.longitude
                    ? `${crime.latitude.toFixed(6)}, ${crime.longitude.toFixed(6)}`
                    : 'Unknown location'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </>
  );
};

export default function EventDetail({ crimeId, onBack }: EventDetailProps) {
  const { data: crime, isLoading: crimeIsLoading } = useQuery({
    queryKey: ['crime', crimeId],
    queryFn: () => fetchCrime(crimeId)
  });

  return (
    <div className="w-full relative">
      <div className="relative mb-4">
        <h2 className="font-semibold">Event Details</h2>
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground absolute right-0 top-0">
          ← Back to list
        </button>
      </div>
      <EventDetailContent crime={crime} crimeIsLoading={crimeIsLoading} />
    </div>
  );
}
