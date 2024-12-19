"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
const chartData = [
  {
    hour: "0",
    crimeCount: 55,
  },
  {
    hour: "1",
    crimeCount: 48,
  },
  {
    hour: "2",
    crimeCount: 23,
  },
  {
    hour: "3",
    crimeCount: 30,
  },
  {
    hour: "4",
    crimeCount: 40,
  },
  {
    hour: "5",
    crimeCount: 16,
  },
  {
    hour: "6",
    crimeCount: 16,
  },
  {
    hour: "7",
    crimeCount: 34,
  },
  {
    hour: "8",
    crimeCount: 78,
  },
  {
    hour: "9",
    crimeCount: 59,
  },
  {
    hour: "10",
    crimeCount: 49,
  },
  {
    hour: "11",
    crimeCount: 55,
  },
  {
    hour: "12",
    crimeCount: 69,
  },
  {
    hour: "13",
    crimeCount: 84,
  },
  {
    hour: "14",
    crimeCount: 93,
  },
  {
    hour: "15",
    crimeCount: 99,
  },
  {
    hour: "16",
    crimeCount: 90,
  },
  {
    hour: "17",
    crimeCount: 101,
  },
  {
    hour: "18",
    crimeCount: 82,
  },
  {
    hour: "19",
    crimeCount: 71,
  },
  {
    hour: "20",
    crimeCount: 78,
  },
  {
    hour: "21",
    crimeCount: 46,
  },
  {
    hour: "22",
    crimeCount: 51,
  },
  {
    hour: "23",
    crimeCount: 41,
  },
];

const chartConfig = {
  crimeCount: {
    label: "Crime count",
    color: "hsl(var(--chart-1))",
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
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
