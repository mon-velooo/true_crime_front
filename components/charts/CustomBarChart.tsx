'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

interface CustomBarChartProps {
  title: string;
  description: string;
  data: { label: string; desktop: number; mobile: number }[];
  config: ChartConfig;
  trend?: {
    value: number;
    isUp: boolean;
  };
  footerText?: string;
}

export function CustomBarChart({ title, description, data, config, footerText }: CustomBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
            <Bar dataKey="mobile" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footerText && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">{footerText}</div>
        </CardFooter>
      )}
    </Card>
  );
}
