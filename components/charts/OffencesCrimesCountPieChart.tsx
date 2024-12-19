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

interface CustomPieChartProps {
  title: string;
  description: string;
  dateRange?: DateRange;
}

export function OffencesCrimesCountPieChart({
  title,
  description,
  dateRange,
}: CustomPieChartProps) {
  const {
    data: offencesCrimesCount,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offencesCrimesCount", dateRange],
    queryFn: () =>
      fetchOffencesCrimesCount({
        rangeDate: dateRange
          ? [dateRange.from?.toISOString(), dateRange.to?.toISOString()]
          : [],
      }),
    enabled: !!dateRange,
  });

  const data =
    offencesCrimesCount?.offencesStats.map((item, index) => ({
      label: item.offence.description,
      value: item.crimeCount,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })) || [];

  if (isLoading) {
    return (
      <Skeleton className="flex flex-col p-4">
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex justify-center items-center h-full">
          <Skeleton className="h-[248px] w-[248px] rounded-full" />
        </div>
      </Skeleton>
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
      <CardHeader className="items-center pb-0">
        <div className="flex justify-between w-full gap-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
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
    </Card>
  );
}
