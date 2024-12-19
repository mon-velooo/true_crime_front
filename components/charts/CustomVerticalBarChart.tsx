"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchHours } from "@/services/hours/fetchHours";
import { CrimeByHourStatsData } from "@/types/graphs";
import { HoursGraphSkeletonCard } from "../skeletons/HoursGraphSkeletonCard";
import { formatNumber } from "../utils/formatNumber";
import { useDateRange } from "@/providers/DateRangeProvider";

const chartConfig = {
  crimeCount: {
    label: "Crimes",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "Average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface CustomVerticalBarChartProps {
  title: string;
  description: string;
}

export function CustomVerticalBarChart({
  title,
  description,
}: CustomVerticalBarChartProps) {
  const { dates } = useDateRange();

  const { data: hoursCrimeData, isLoading } = useQuery<CrimeByHourStatsData>({
    queryKey: ["hoursCrime", dates],
    queryFn: () =>
      fetchHours({
        rangeStartDate: dates.startDate,
        rangeEndDate: dates.endDate,
      }),
    enabled: !!dates.startDate && !!dates.endDate,
  });

  if (isLoading) {
    return <HoursGraphSkeletonCard />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={hoursCrimeData.stats}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="crimeCount" fill="var(--color-crimeCount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <ReferenceLine
              y={hoursCrimeData.average}
              isFront={true}
              stroke="hsl(var(--chart-3))"
              strokeDasharray="7"
              label={{
                value: `A`,
                position: "right",
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Median {formatNumber(hoursCrimeData.average)} and passed{" "}
          {hoursCrimeData.averagePastTime} times
        </div>
        <div className="leading-none text-muted-foreground">
          Median is based on the number of crimes reported this period
        </div>
      </CardFooter>
    </Card>
  );
}
