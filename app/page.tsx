"use client";

import { CustomBarChart } from "@/components/charts/CustomBarChart";
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
import { CustomVerticalBarChart } from "@/components/charts/CustomVerticalBarChart";

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

  const [rangeStartDate, setRangeStartDate] = useState("2024-09-30");
  const [rangeEndDate, setRangeEndDate] = useState("2024-09-30");

  const { data: districts } = useQuery({
    queryKey: ["districts", rangeStartDate, rangeEndDate],
    queryFn: () => fetchDistricts(rangeStartDate, rangeEndDate),
  });

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
          <CustomVerticalBarChart
            title="Crime distribution by twice hour"
            description="Number of reported crimes throughout each pair hour of the range date"
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
            description="Security rate per 100K residents"
            dateRange={dateRange}
          />
        </Grid>
      </Container>
    </>
  );
}
