import { fetchKpis } from "@/services/kpis/fetchKpis";
import { CustomKPIChart } from "../charts/CustomKPIChart";
import { Card } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { KpiSkeletonCard } from "../skeletons/KpiSkeletonCard";
import { KpiData } from "@/types/kpis";

const kpiData = [
  { title: "Nombre de criminels", description: "300K" },
  { title: "Nombre d'infraction", description: "300K" },
  { title: "Nombre de victimes", description: "300K" },
  { title: "Nombre de criminels", description: "300K" },
  { title: "Nombre d'infractions", description: "300K" },
  { title: "Nombre de criminels", description: "300K" },
];

interface CustomKPIChartProps {
  rangeStartDate?: string;
  rangeEndDate?: string;
}

export const KpisList = ({
  rangeStartDate,
  rangeEndDate,
}: CustomKPIChartProps) => {
  const { data: kpis, isLoading } = useQuery<KpiData[]>({
    queryKey: ["kpis", rangeStartDate, rangeEndDate],
    queryFn: () =>
      fetchKpis({
        rangeStartDate: rangeStartDate,
        rangeEndDate: rangeEndDate,
      }),
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
      <Card>
        <div className="flex align-middle justify-between p-4">
          <h2 className="text-lg font-semibold">Daily KPIs</h2>
        </div>
      </Card>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <KpiSkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((kpi, index) => (
            <CustomKPIChart
              key={index}
              title={kpi.title}
              description={kpi.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
