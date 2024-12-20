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
import { useDateRange } from "@/providers/DateRangeProvider";
import { fetchCrimesByDays } from "@/services/graphs/fetchCrimesByDays";
import {
  ApiCrimeByDayStatsData,
  CrimeByDayData,
  CrimeByDayStatsData,
} from "@/types/graphs";
import { useQuery } from "@tanstack/react-query";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { formatNumber } from "../utils/formatNumber";
import { CustomLineChartSkeleton } from "../skeletons/CustomLineChartSkeleton";

interface CustomBarChartProps {
  title: string;
  description: string;
}

const data = [
  { date: "Mar 6", crimes: 186, average: 80 },
  { month: "Mar 7", crimes: 305, mobile: 200 },
  { month: "Mar 8", crimes: 237, mobile: 120 },
  { month: "Mar 9", crimes: 73, mobile: 190 },
  { month: "Mar 10", crimes: 209, mobile: 130 },
  { month: "Mar 11", crimes: 214, mobile: 140 },
];

const config = {
  crimes: {
    label: "Crimes",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "Average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomLineChart({ title, description }: CustomBarChartProps) {
  const { dates } = useDateRange();

  const { data: daysCrimeData, isLoading } = useQuery<CrimeByDayStatsData>({
    queryKey: ["daysCrime", dates],
    queryFn: () =>
      fetchCrimesByDays({
        rangeStartDate: dates.startDate,
        rangeEndDate: dates.endDate,
      }),
    enabled: !!dates.startDate && !!dates.endDate,
  });

  const minValue = Math.min(
    ...(daysCrimeData?.stats?.map((d) => d.crimes) || [])
  );
  const maxValue = Math.max(
    ...(daysCrimeData?.stats?.map((d) => d.crimes) || [])
  );
  const buffer = (maxValue - minValue) * 0.2;

  const getDistributedDates = (data: CrimeByDayData[]) => {
    if (!data || data.length < 2) return [];
    if (data.length <= 10) return data.map((d) => d.date);

    const result = [];
    const step = Math.floor((data.length - 1) / 6);

    // Add first date
    result.push(data[0].date);

    // Add 5 intermediate dates
    for (let i = 1; i <= 5; i++) {
      result.push(data[i * step].date);
    }

    // Add last date
    result.push(data[data.length - 1].date);

    return result;
  };

  if (isLoading) {
    return <CustomLineChartSkeleton />;
  }

  {
    console.log("data:", daysCrimeData);
  }

  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="text-sm font-medium text-muted-foreground">
            {daysCrimeData.numberOfDays} days period
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="h-[40vh] min-h-[300px] w-full"
        >
          <LineChart accessibilityLayer data={daysCrimeData.stats}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              width={35}
              domain={[
                Math.floor(minValue - buffer),
                Math.ceil(maxValue + buffer),
              ]}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              ticks={getDistributedDates(daysCrimeData.stats)}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="crimes"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Daily average of {formatNumber(daysCrimeData.average)} crimes
        </div>
        <div className="leading-none text-muted-foreground">
          Total of {formatNumber(daysCrimeData.total)} incidents recorded
        </div>
      </CardFooter>
    </Card>
  );
}
