"use client";

import { CustomBarChart } from "@/components/charts/CustomBarChart";
import { CustomVerticalBarChart } from "@/components/charts/CustomVerticalBarChart";
import { OffencesCrimesCountPieChart } from "@/components/charts/OffencesCrimesCountPieChart";
import { CustomRadialChart } from "@/components/charts/CustomRadialChart";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { KpisList } from "@/components/lists/KpisList";
import formatDate from "@/components/utils/formatDate";
import { fetchDistricts } from "@/services/districts/fetchDistricts";
import { fetchHours } from "@/services/hours/fetchHours";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { MostDangerousNeighborhoods } from "@/components/charts/MostDangerousNeighborhoods";

export default function Home() {
  const config = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const start = new Date("03-05-2024");
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: start,
    to: today,
  });

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
  };

  return (
    <>
      <Container>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <DateRangePicker onDateChange={handleDateChange} />
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
          {/* <CustomVerticalBarChart
            title="Crime Distribution by Hour"
            description="This chart shows the number of reported crimes throughout each hour of the day."
            data={formattedData}
            config={config}
          />
          <CustomBarChart
            title="Most dangerous neighborhoods"
            data={districts}
            config={config}
            setRangeStartDate={setRangeStartDate}
            setRangeEndDate={setRangeEndDate}
          /> */}
          <MostDangerousNeighborhoods
            title="Most dangerous neighborhoods"
            dateRange={dateRange}
          />
          <OffencesCrimesCountPieChart
            title="Breakdown of crime types"
            description={`${formatDate(dateRange?.from)} - ${formatDate(dateRange?.to)}`}
            dateRange={dateRange}
          />

          <KpisList dateRange={dateRange} />

          <CustomRadialChart
            title="Security rate"
            description={`${formatDate(dateRange?.from)} - ${formatDate(dateRange?.to)}`}
            dateRange={dateRange}
          />
        </Grid>
      </Container>
    </>
  );
}
