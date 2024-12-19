"use client";

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
import { fetchOffencesCrimesCount } from "@/services/graphs/fetchOffencesCrimesCount";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Label, Pie, PieChart } from "recharts";
import { Skeleton } from "../ui/skeleton";
import { CustomRadialBarSkeletonCard } from "../skeletons/CustomRadialBarSkeletonCard";
import { formatNumber } from "../utils/formatNumber";
import { useDateRange } from "@/providers/DateRangeProvider";

interface CustomPieChartProps {
  title: string;
  description: string;
}

export function OffencesCrimesCountPieChart({
  title,
  description,
}: CustomPieChartProps) {
  const { dates } = useDateRange();

  const {
    data: offencesCrimesCount,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offencesCrimesCount", dates],
    queryFn: () =>
      fetchOffencesCrimesCount({
        rangeStartDate: dates.startDate,
        rangeEndDate: dates.endDate,
      }),
    enabled: !!dates.startDate && !!dates.endDate,
  });

  const data =
    offencesCrimesCount?.offencesStats.map((item, index) => ({
      label: item.offence.description,
      value: item.crimeCount,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })) || [];

  if (isLoading) {
    return <CustomRadialBarSkeletonCard />;
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

  const total = offencesCrimesCount?.totalCrime || 0;

  const config = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } as ChartConfig;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-2">
          <p className="font-medium">{payload[0].payload.label}</p>
          <p className="text-muted-foreground">
            {payload[0].value} ({((payload[0].value / total) * 100).toFixed(1)}
            %)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<CustomTooltip active={true} payload={true} />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {data[0].label} has the most crimes with {formatNumber(data[0].value)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing main offences for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
