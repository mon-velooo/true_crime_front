"use client";
import { CustomBarChart } from "@/components/charts/CustomBarChart";
import { CustomLineChart } from "@/components/charts/CustomLineChart";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { CustomRadialChart } from "@/components/charts/CustomRadialChart";
import { CustomVerticalBarChart } from "@/components/charts/CustomVerticalBarChart";
import { Container } from "@/components/layout/Container/Container";
import Grid from "@/components/layout/Grid/Grid";
import { KpisList } from "@/components/lists/KpisList";
import { ChartConfig } from "@/components/ui/chart";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { fetchDistricts } from "@/services/districts/fetchDistricts";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const pieData = [
    { label: "chrome", value: 275, fill: "hsl(var(--chart-1))" },
    { label: "safari", value: 200, fill: "hsl(var(--chart-2))" },
    { label: "firefox", value: 287, fill: "hsl(var(--chart-3))" },
    { label: "edge", value: 173, fill: "hsl(var(--chart-4))" },
    { label: "other", value: 190, fill: "hsl(var(--chart-5))" },
  ];

  const radialData = [{ month: "january", desktop: 1260, mobile: 570 }];

  const pieConfig = {
    chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
    safari: { label: "Safari", color: "hsl(var(--chart-2))" },
    firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
    edge: { label: "Edge", color: "hsl(var(--chart-4))" },
    other: { label: "Other", color: "hsl(var(--chart-5))" },
  };

  const data = [
    { label: "January", desktop: 186, mobile: 80 },
    { label: "February", desktop: 305, mobile: 200 },
    { label: "March", desktop: 237, mobile: 120 },
    { label: "April", desktop: 73, mobile: 190 },
    { label: "May", desktop: 209, mobile: 130 },
    { label: "June", desktop: 214, mobile: 140 },
  ];

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

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

  const { data: districts } = useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistricts,
  });

  return (
    <>
      <Container>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <DateRangePicker />
        </div>
        <Grid
          cols={{
            mobile: 2,
            tablet: 2,
            desktop: 2,
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
            title="test"
            description="test"
            data={chartData}
            config={chartConfig}
          />
          <CustomBarChart
            title="Most dangerous neighborhoods"
            data={districts}
            config={config}
          />
          <CustomPieChart
            title="Répartition des types de crimes"
            description="January - June 2024"
            data={pieData}
            config={pieConfig}
            trend={{ value: 5.2, isUp: false }}
            footerText="Showing total visitors for the last 6 months"
          />

          <KpisList rangeStartDate="2020-01-01" rangeEndDate="2021-01-30" />

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
