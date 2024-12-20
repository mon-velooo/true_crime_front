"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
import { useDateRange } from "@/providers/DateRangeProvider";
import { AgeGroupCrimesStatsData } from "@/types/graphs";
import { fetchAgeGroup } from "@/services/graphs/fetchAgeGroup";
import { CustomRadialBarSkeletonCard } from "../skeletons/CustomRadialBarSkeletonCard";
import { formatNumber } from "../utils/formatNumber";

interface CustomRadarChartProps {
  title: string;
  description: string;
}
const chartData = [
  { ageRange: "<18", victims: 186, suspects: 160 },
  { ageRange: "18-24", victims: 185, suspects: 170 },
  { ageRange: "25-44", victims: 207, suspects: 180 },
  { ageRange: "45-64", victims: 173, suspects: 160 },
  { ageRange: "65+", victims: 160, suspects: 190 },
];

const chartConfig = {
  victims: {
    label: "Victims",
    color: "hsl(var(--chart-1))",
  },
  suspects: {
    label: "Suspects",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomRadarChart({
  title,
  description,
}: CustomRadarChartProps) {
  const { dates } = useDateRange();

  const { data: chartData, isLoading } = useQuery<AgeGroupCrimesStatsData>({
    queryKey: ["ageGroup", dates],
    queryFn: () =>
      fetchAgeGroup({
        rangeStartDate: dates.startDate,
        rangeEndDate: dates.endDate,
      }),
    enabled: !!dates.startDate && !!dates.endDate,
  });

  if (isLoading) {
    return <CustomRadialBarSkeletonCard />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadarChart data={chartData.stats}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="ageRange" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="victims"
              fill="var(--color-victims)"
              fillOpacity={0}
              stroke="var(--color-victims)"
              strokeWidth={2}
            />
            <Radar
              dataKey="suspects"
              fill="var(--color-suspects)"
              fillOpacity={0}
              stroke="var(--color-suspects)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Unknown age group represent{" "}
          {formatNumber(chartData.extremValue.victims)} victims and{" "}
          {formatNumber(chartData.extremValue.suspects)} suspects
        </div>
        <div className="leading-none text-muted-foreground">
          Showing age group count for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
