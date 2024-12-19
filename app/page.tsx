"use client";

import { OffencesCrimesCountPieChart } from "@/components/charts/OffencesCrimesCountPieChart";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { KpisList } from "@/components/lists/KpisList";
import formatDate from "@/components/utils/formatDate";

export default function Home() {
  const start = new Date("03-05-2024");
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: start,
    to: today
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

          <OffencesCrimesCountPieChart
            title="Breakdown of crime types"
            description={`${formatDate(dateRange?.from)} - ${formatDate(dateRange?.to)}`}
            dateRange={dateRange}
          />

          <KpisList dateRange={dateRange} />
        </Grid>
      </Container>
    </>
  );
}
