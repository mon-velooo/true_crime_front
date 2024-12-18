'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CustomBarChartProps {
  title: string;
  description?: string;
  data: { districts: Array<{ id: number; name: string }> };
  config: ChartConfig;
  footerText?: string;
}

export function CustomBarChart({ title, description, data, config, footerText }: CustomBarChartProps) {
  console.log(data);

  if (!data || !data.districts) return null;

  const chartData = data.districts.map((district) => ({
    label: district.name,
    value: district.id
  }));

  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between align-middle gap-2">
          <CardTitle>{title}</CardTitle>
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
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20
            }}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={15} />
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
