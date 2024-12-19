import React from 'react';
import type { Crime, CrimesResponse } from '@/types/crimes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import EventDetail from './EventDetail';

type EventActivityProps = {
  crimes: CrimesResponse;
  selectedCrime: Crime | null;
  hoveredCrime: Crime | null;
  onCrimeSelect: (crime: Crime | null) => void;
  onCrimeHover: (crime: Crime | null) => void;
};

export const getLawCategoryColor = (label: string) => {
  switch (label) {
    case 'VIOLATION':
      return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
    case 'MISDEMEANOR':
      return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
  }
};

export default function EventActivity({
  crimes,
  selectedCrime,
  hoveredCrime,
  onCrimeSelect,
  onCrimeHover
}: EventActivityProps) {
  if (selectedCrime) {
    return <EventDetail crimeId={selectedCrime.id} onBack={() => onCrimeSelect(null)} />;
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold mb-4">Events activity</h2>
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-550px)]">
          <div className="space-y-4">
            {crimes?.crimes.map((crime) => (
              <div
                key={crime.id}
                className={cn(
                  'p-4 rounded-md  transition-colors cursor-pointer border border-border-secondary',
                  hoveredCrime?.id === crime.id ? 'bg-accent' : 'bg-card-secondary hover:bg-accent'
                )}
                onMouseEnter={() => onCrimeHover(crime)}
                onMouseLeave={() => onCrimeHover(null)}
                onClick={() => onCrimeSelect(crime)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-medium">{crime.description}</p>
                      <p className="text-sm text-muted-foreground">{crime.offence.description}</p>
                    </div>
                    <Badge variant="secondary" className={getLawCategoryColor(crime.lawCategory.label)}>
                      {crime.lawCategory.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Date</p>
                      <p>{new Date(crime.start_date).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Code</p>
                      <p>{crime.offence.code}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground border-t border-border-secondary pt-2 mt-2">
                    <p className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                      {crime.latitude.toFixed(4)}, {crime.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card-secondary to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
