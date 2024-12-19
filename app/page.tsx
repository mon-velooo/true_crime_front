"use client";
import { CustomKPIChart } from "@/components/charts/CustomKPIChart";
import { OffencesCrimesCountPieChart } from "@/components/charts/OffencesCrimesCountPieChart";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

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

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'MMMM dd, yyyy');
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

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
            <Card>
              <div className="flex align-middle justify-between p-4">
                <h2 className="text-lg font-semibold">Daily KPIs</h2>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-2">
              <CustomKPIChart title="Nombre de criminels" description="300K" />
              <CustomKPIChart title="Nombre d'infractions" description="300K" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <CustomKPIChart title="Nombre de victimes" description="300K" />
              <CustomKPIChart title="Nombre de criminels" description="300K" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <CustomKPIChart title="Nombre d'infractions" description="300K" />
              <CustomKPIChart title="Nombre de criminels" description="300K" />
            </div>
          </div>
        </Grid>
      </Container>
    </>
  );
}
