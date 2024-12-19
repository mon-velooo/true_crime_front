"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { CrimeByDistrictData } from "@/types/graphs";
import { fetchDistricts } from "@/services/districts/fetchDistricts";
import { HoursGraphSkeletonCard } from "../skeletons/HoursGraphSkeletonCard";
import { capitalizeFirstLetter, toTitleCase } from "../utils/formatString";
import { formatNumber } from "../utils/formatNumber";
import { useDateRange } from "@/providers/DateRangeProvider";

const chartConfig = {
  crimeCount: {
    label: "Crimes",
  },
  brooklyn: {
    label: "Brooklyn",
    color: "hsl(var(--chart-1))",
  },
  manhattan: {
    label: "Manhattan",
    color: "hsl(var(--chart-2))",
  },
  queens: {
    label: "Queens",
    color: "hsl(var(--chart-3))",
  },
  bronx: {
    label: "Bronx",
    color: "hsl(var(--chart-4))",
  },
  statenIsland: {
    label: "Staten Island",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface CustomBarChartProps {
  title: string;
  description: string;
}

export function CustomBarChart({ title, description }: CustomBarChartProps) {
  const { dates } = useDateRange();

  const { data: chartData, isLoading } = useQuery<CrimeByDistrictData[]>({
    queryKey: ["topDistrictsCrime", dates],
    queryFn: () =>
      fetchDistricts({
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
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <YAxis
              dataKey="district"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="crimeCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="crimeCount" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {capitalizeFirstLetter(toTitleCase(chartData[0].district))} is in head
          with {formatNumber(chartData[0].crimeCount)} crimes
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total crimes for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
