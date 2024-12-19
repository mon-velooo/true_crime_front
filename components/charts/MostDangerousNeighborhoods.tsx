'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect, useState } from 'react';
import { DistrictGraphSkeletonCard } from '../skeletons/DistrictGraphSkeletonCard'; // Import du squelette
import { DateRange } from 'react-day-picker';
import { fetchDistricts } from '@/services/districts/fetchDistricts';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';

interface MostDangerousNeighborhoodsProps {
  title: string;
  description?: string;
  footerText?: string;
  dateRange: DateRange;
}

export function MostDangerousNeighborhoods({ title, description, footerText, dateRange}: MostDangerousNeighborhoodsProps) {
  const {
    data: districts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["districts", dateRange],
    queryFn: () =>
      fetchDistricts({
        rangeDate: dateRange
          ? [dateRange.from?.toISOString(), dateRange.to?.toISOString()]
          : [],
      }),
    enabled: !!dateRange,
  });

  const data = districts?.map((item, index) => ({
    label: item.district.name,
    value: item.crimeCount,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));
  console.log(data);

  const config = {} satisfies ChartConfig;

  if (isLoading) {
    return (
      <DistrictGraphSkeletonCard />
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col">
        <CardContent className="flex-1 flex justify-center items-center">
          <p>Error loading data.</p>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-2">
          <p className="font-medium">{payload[0].payload.label}</p>
          <p className="text-muted-foreground">
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between align-middle gap-2">
          <CardTitle>{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <XAxis type="number" dataKey="value" axisLine={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip active={true} payload={true} />} />
            <Bar dataKey="value" radius={15} />
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
