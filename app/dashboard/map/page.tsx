"use client";

import MapContainer from "@/components/map/mapContainer/MapContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import React from "react";

export default function DashboardPage() {
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
          <CardHeader>
            <CardTitle>Real-time Crime Map</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <MapContainer className="w-full h-64 rounded-md" />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
