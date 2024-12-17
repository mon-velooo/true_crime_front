'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

interface CustomPieChartProps {
  title: string;
  description: string;
  data: { label: string; value: number; fill: string }[];
  config: ChartConfig;
  trend?: {
    value: number;
    isUp: boolean;
  };
  footerText?: string;
}

export function CustomPieChart({ title, description, data, config, trend, footerText }: CustomPieChartProps) {
  const totalValue = data.reduce((acc, { value }) => acc + value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
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
      {(trend || footerText) && (
        <CardFooter className="flex-col gap-2 text-sm">
          {trend && (
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending {trend.isUp ? 'up' : 'down'} by {trend.value}% this name{' '}
              {trend.isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          )}
          {footerText && <div className="leading-none text-muted-foreground">{footerText}</div>}
        </CardFooter>
      )}
    </Card>
  );
}
