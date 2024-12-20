"use client";

import MapContainer from "@/components/map/mapContainer/MapContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import React, { useEffect, useState } from "react";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { useDateRange } from "@/providers/DateRangeProvider";

export default function DashboardPage() {
  const { dates } = useDateRange();
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(dates.endDate)
  );

  useEffect(() => {
    if (
      selectedDate < new Date(dates.startDate) ||
      selectedDate > new Date(dates.endDate)
    ) {
      setSelectedDate(new Date(dates.startDate));
    }
  }, [dates]);

  useEffect(() => {
    if (dates.startDate && !selectedDate) {
      setSelectedDate(new Date(dates.startDate));
    }
  }, [dates.startDate, selectedDate]);
  return (
    <Container className="p-4">
      <Grid
        cols={{
          mobile: 1,
          tablet: 2,
          desktop: 2,
        }}
        gap={4}
      >
        <Card>
          <CardHeader>
            <CardTitle>Crime Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">Content</CardContent>
        </Card>

        <Card>
          <CardHeader className="relative w-full">
            <CardTitle>Real-time Crime Map</CardTitle>
            <div className="absolute top-2 right-4">
              <DatePickerWithRange
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                startDate={dates.startDate}
                endDate={dates.endDate}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            <MapContainer
              className="w-full h-64 rounded-md"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dates={dates}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
