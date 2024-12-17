'use client';
import { CustomBarChart } from '@/components/charts/CustomBarChart';
import { CustomKPIChart } from '@/components/charts/CustomKPIChart';
import { CustomLineChart } from '@/components/charts/CustomLineChart';
import { CustomPieChart } from '@/components/charts/CustomPieChart';
import { Container } from '@/components/layout/Container/Container';
import Grid from '@/components/layout/Grid/Grid';
import { ChartConfig } from '@/components/ui/chart';

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

  return (
    <>
      <Container>
        {/* <Card>
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            <MapView />
          </CardContent>
        </Card> */}
        <Grid
          cols={{
            mobile: 1,
            tablet: 2,
            desktop: 2
          }}
          gap={2}
        >
          <CustomLineChart
            title="Line Chart"
            description="January - June 2024"
            data={data}
            config={config}
            footerText="Showing total visitors for the last 6 months"
          />

          <CustomBarChart
            title="Bar Chart"
            description="January - June 2025"
            data={data}
            config={config}
            footerText="Showing total visitors for the last 6 months"
          />

          <CustomPieChart
            title="Browser Usage"
            description="January - June 2024"
            data={pieData}
            config={pieConfig}
            trend={{ value: 5.2, isUp: false }}
            footerText="Showing total visitors for the last 6 months"
          />

          <CustomKPIChart title="Titre" description="description" footerText="footer" />
        </Grid>
      </Container>
    </>
  );
}
