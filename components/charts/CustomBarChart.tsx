'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect, useState } from 'react';

interface CustomBarChartProps {
  title: string;
  description?: string;
  data: { districts: Array<{ id: number; name: string }> };
  config: ChartConfig;
  footerText?: string;
  setRangeStartDate: (date: string) => void;
  setRangeEndDate: (date: string) => void;
}

export function CustomBarChart({ title, description, data, config, footerText, setRangeStartDate, setRangeEndDate }: CustomBarChartProps) {
  if (!data) return null;

  const chartData = data.map((item) => ({ 
    label: item.district.name,
    value: item.crimeCount,
  }));

  const today = new Date('2024-09-30');

  const getDateRange = (period: string) => {
    let startDate = new Date(today);
    let endDate = new Date(today);

    if (period === 'day') {
      startDate.setDate(today.getDate() - 1);
      endDate = today;
    } else if (period === 'month') {
      startDate.setMonth(today.getMonth() - 1);
      startDate.setDate(1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (period === 'year') {
      startDate.setFullYear(today.getFullYear() - 1);
      startDate.setMonth(0);
      startDate.setDate(1);
      endDate = new Date(today.getFullYear() - 1, 11, 31);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  const handleSelectChange = (value: string) => {
    const { startDate, endDate } = getDateRange(value);
    setRangeStartDate(startDate);
    setRangeEndDate(endDate);
  };

  useEffect(() => {
    console.log('chartData', chartData);
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between align-middle gap-2">
          <CardTitle>{title}</CardTitle>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="day" defaultChecked>Last day</SelectItem>
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
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={-3}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
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
