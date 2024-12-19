'use client';

import { CustomBarChart } from "@/components/charts/CustomBarChart";
import { CustomVerticalBarChart } from "@/components/charts/CustomVerticalBarChart";
import { OffencesCrimesCountPieChart } from '@/components/charts/OffencesCrimesCountPieChart';
import { CustomRadialChart } from '@/components/charts/CustomRadialChart';
import { Container } from '@/components/layout/Container/Container';
import Grid from '@/components/layout/Grid/Grid';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { KpisList } from '@/components/lists/KpisList';
import formatDate from '@/components/utils/formatDate';
import { fetchDistricts } from "@/services/districts/fetchDistricts";
import { fetchHours } from "@/services/hours/fetchHours";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CustomLineChart } from "@/components/charts/CustomLineChart";

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
  
  
  const start = new Date('03-05-2024');
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: start,
    to: today
  });

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
  };
  

  const [rangeStartDate, setRangeStartDate] = useState('2024-09-30');
  const [rangeEndDate, setRangeEndDate] = useState('2024-09-30');
  
  const { data: districts} = useQuery({
    queryKey: ["districts", rangeStartDate, rangeEndDate], 
    queryFn: () => fetchDistricts(rangeStartDate, rangeEndDate),
  });

  const { data: hours, isLoading, error } = useQuery({
    queryKey: ["hours", rangeStartDate, rangeEndDate],
    queryFn: () => fetchHours(rangeStartDate, rangeEndDate),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const formattedData = hours.stats.map(item => ({
    hour: item.hour,
    crimeCount: item.crimeCount,
  }));
  
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
            desktop: 2
          }}
          gap={2}
          className="pb-4"
        >
          <CustomLineChart
            title="Line Chart"
            description="January - June 2024"
            data={data}
            config={config}
            footerText="Showing total visitors for the last 6 months"
          />
          <CustomVerticalBarChart
            title="Crime Distribution by Hour"
            description="This chart shows the number of reported crimes throughout each hour of the day."
            data={formattedData}
            config={chartConfig}
          />
          <CustomBarChart
            title="Most dangerous neighborhoods"
            data={districts}
            config={config} 
            setRangeStartDate={setRangeStartDate} 
            setRangeEndDate={setRangeEndDate}     
          />
          <OffencesCrimesCountPieChart
            title="Breakdown of crime types"
            description={`${formatDate(dateRange?.from)} - ${formatDate(dateRange?.to)}`}
            dateRange={dateRange}
          />

          <KpisList dateRange={dateRange} />

          <CustomRadialChart
            title="Security rate"
            description="January - June 2024"
            rangeStartDate="2024-01-01"
            rangeEndDate="2024-03-30"
          />
        </Grid>
      </Container>
    </>
  );
}
