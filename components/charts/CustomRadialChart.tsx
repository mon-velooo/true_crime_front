"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { fetchSecurityFeeling } from "@/services/kpis/fetchKpis";
import { KpiSecurityFeelingData } from "@/types/kpis";
import { useQuery } from "@tanstack/react-query";
import { CustomRadialBarSkeletonCard } from "../skeletons/CustomRadialBarSkeletonCard";

const REFERENCE_VALUE = 1.3;

// Dans le composant
const calculateTrend = (crimeRate: string) => {
  const crimeRateNumber = parseFloat(crimeRate);
  const difference =
    ((crimeRateNumber - REFERENCE_VALUE) / REFERENCE_VALUE) * 100;
  return {
    value: Math.abs(difference).toFixed(1),
    isUp: difference > 0,
  };
};

const chartConfig = {
  securityRate: {
    label: "Security",
    color: "hsl(var(--chart-1))",
  },
  insecurityRate: {
    label: "Insecurity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface CustomVerticalBarChartProps {
  title: string;
  description: string;
  rangeStartDate: string;
  rangeEndDate: string;
}

export function CustomRadialChart({
  title,
  description,
  rangeStartDate,
  rangeEndDate,
}: CustomVerticalBarChartProps) {
  const { data: kpi, isLoading } = useQuery<KpiSecurityFeelingData[]>({
    queryKey: ["securityFeeling", rangeStartDate, rangeEndDate],
    queryFn: () =>
      fetchSecurityFeeling({
        rangeStartDate,
        rangeEndDate,
      }),
  });

  if (isLoading) {
    return <CustomRadialBarSkeletonCard />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={kpi}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {kpi[0].crimeRate}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Cirminal Point
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="insecurityRate"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-securityRate)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="securityRate"
              fill="var(--color-insecurityRate)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {kpi && (
          <div className="flex items-center gap-2 font-medium leading-none">
            {(() => {
              const trend = calculateTrend(kpi[0].crimeRate);
              return (
                <>
                  Trending {trend.isUp ? "up" : "down"} by {trend.value}% for
                  100K residents
                  {trend.isUp ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </>
              );
            })()}
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Showing security rate for the actual range date selected
        </div>
      </CardFooter>
    </Card>
  );
}
