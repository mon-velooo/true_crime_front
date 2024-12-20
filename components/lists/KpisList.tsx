import { fetchKpis } from "@/services/kpis/fetchKpis";
import { CustomKPIChart } from "../charts/CustomKPIChart";
import { Card } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { KpiSkeletonCard } from "../skeletons/KpiSkeletonCard";
import { KpiData } from "@/types/kpis";
import { useDateRange } from "@/providers/DateRangeProvider";

export const KpisList = () => {
  const { dates } = useDateRange();

  const { data: kpis, isLoading } = useQuery<KpiData[]>({
    queryKey: ["kpis", dates],
    queryFn: () =>
      fetchKpis({
        rangeStartDate: dates.startDate,
        rangeEndDate: dates.endDate,
      }),
      enabled: !!dates.startDate && !!dates.endDate,
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <KpiSkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
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
