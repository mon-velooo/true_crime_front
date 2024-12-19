import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { HoursGraphSkeletonCard } from "../skeletons/HoursGraphSkeletonCard"; // Importer le squelette pour le graphique

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
} from "@/components/ui/chart";

interface CustomVerticalBarChartProps {
  title: string;
  description?: string;
  data: { hour: string; crimeCount: number }[];
  config: ChartConfig;
  footerText?: string;
}

function CustomTooltip({ payload, label }: any) {
  if (payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          fontSize: "12px",
          color: "#333",
        }}
      >
        <p style={{ margin: "0", fontWeight: "bold" }}>{`Heure: ${label}:00`}</p>
        <p style={{ margin: "0" }}>
          {`Nombre de crimes: `}
          <strong>{data.crimeCount}</strong>
        </p>
      </div>
    );
  }
  return null;
}

export function CustomVerticalBarChart({
  title,
  description,
  data,
  config,
  footerText,
}: CustomVerticalBarChartProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un délai de chargement de 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Après 3 secondes, les données sont considérées comme chargées
    }, 3000);

    return () => clearTimeout(timer); // Nettoyer le timer au démontage du composant
  }, []);

  if (isLoading) {
    return <HoursGraphSkeletonCard />;
  }

  // Si les données sont chargées, afficher le graphique
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) => `${value}:00`}
              angle={-30}
              textAnchor="end"
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="crimeCount" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        {footerText && (
          <div className="leading-none text-muted-foreground">{footerText}</div>
        )}
      </CardFooter>
    </Card>
  );
}
