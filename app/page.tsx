'use client';
import { CustomBarChart } from '@/components/charts/CustomBarChart';
import { CustomKPIChart } from '@/components/charts/CustomKPIChart';
import { CustomLineChart } from '@/components/charts/CustomLineChart';
import { CustomPieChart } from '@/components/charts/CustomPieChart';
import { CustomVerticalBarChart } from '@/components/charts/CustomVerticalBarChart';
import { Container } from '@/components/layout/Container/Container';
import Grid from '@/components/layout/Grid/Grid';
import { Card } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchDistricts } from '@/services/districts/fetchDistricts';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const pieData = [
    { label: 'chrome', value: 275, fill: 'hsl(var(--chart-1))' },
    { label: 'safari', value: 200, fill: 'hsl(var(--chart-2))' },
    { label: 'firefox', value: 287, fill: 'hsl(var(--chart-3))' },
    { label: 'edge', value: 173, fill: 'hsl(var(--chart-4))' },
    { label: 'other', value: 190, fill: 'hsl(var(--chart-5))' }
  ];

  const pieConfig = {
    chrome: { label: 'Chrome', color: 'hsl(var(--chart-1))' },
    safari: { label: 'Safari', color: 'hsl(var(--chart-2))' },
    firefox: { label: 'Firefox', color: 'hsl(var(--chart-3))' },
    edge: { label: 'Edge', color: 'hsl(var(--chart-4))' },
    other: { label: 'Other', color: 'hsl(var(--chart-5))' }
  };

  const data = [
    { label: 'January', desktop: 186, mobile: 80 },
    { label: 'February', desktop: 305, mobile: 200 },
    { label: 'March', desktop: 237, mobile: 120 },
    { label: 'April', desktop: 73, mobile: 190 },
    { label: 'May', desktop: 209, mobile: 130 },
    { label: 'June', desktop: 214, mobile: 140 }
  ];

  const config = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))'
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  const { data: districts } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchDistricts
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

          <CustomVerticalBarChart title="Most dangerous neighborhoods" data={districts} config={config} />

          <CustomBarChart title="Most dangerous neighborhoods" data={districts} config={config} />

          <CustomPieChart
            title="Répartition des types de crimes"
            description="January - June 2024"
            data={pieData}
            config={pieConfig}
            trend={{ value: 5.2, isUp: false }}
            footerText="Showing total visitors for the last 6 months"
          />

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
            <Card>
              <div className="flex align-middle justify-between p-4">
                <h2 className="text-lg font-semibold">Daily KPIs</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="day" defaultChecked>
                        Last day
                      </SelectItem>
                      <SelectItem value="month">Last month</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
