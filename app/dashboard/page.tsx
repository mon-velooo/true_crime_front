"use client";

import { OffencesCrimesCountPieChart } from "@/components/charts/OffencesCrimesCountPieChart";
import { CustomRadialChart } from "@/components/charts/CustomRadialChart";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import * as React from "react";
import { KpisList } from "@/components/lists/KpisList";
import { CustomVerticalBarChart } from "@/components/charts/CustomVerticalBarChart";
import { CustomBarChart } from "@/components/charts/CustomBarChart";

export default function Home() {
  return (
    <Container>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <Grid
        cols={{
          mobile: 3,
          tablet: 2,
          desktop: 2,
        }}
        gap={2}
        className="pb-4"
      >
        <CustomVerticalBarChart
          title="Crime distribution by twice hour"
          description="Number of reported crimes throughout each pair hour"
        />

        <CustomBarChart
          title="Top crimes by district"
          description="Number of reported crimes throughout each district"
        />

        <OffencesCrimesCountPieChart
          title="Breakdown of crime types"
          description="Significant crimes number reported by type"
        />

        <KpisList />

        <CustomRadialChart
          title="Security rate"
          description="Security rate per 100K residents"
        />
      </Grid>
    </Container>
  );
}
