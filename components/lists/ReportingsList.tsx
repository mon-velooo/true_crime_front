import { useQuery } from "@tanstack/react-query";

import { ReportingData } from "@/types/reportings";
import { fetchReportings } from "@/services/reportings/fetchReportings";
import { ScrollArea } from "../ui/scroll-area";

const reportings: ReportingData[] = [
  {
    id: "1",
    latitude: 1.1,
    longitude: 1.1,
    status: "Reported",
    description: "Robbery",
  },
  {
    id: "2",
    latitude: 1.1,
    longitude: 1.1,
    status: "Reported",
    description: "Assault",
  },
  {
    id: "3",
    latitude: 1.1,
    longitude: 1.1,
    status: "Reported",
    description: "Theft",
  },
];

export const ReportingsList = () => {
  const { data: reportings1, isLoading } = useQuery<ReportingData[]>({
    queryKey: ["reportings"],
    queryFn: () => fetchReportings(),
  });

  return (
    <div className="w-full">
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-510px)]">
          <div className="space-y-4">
            {reportings1?.map((reporting) => (
              <div
                key={reporting.id}
                className="p-4 rounded-md  transition-colors cursor-pointer border border-border-secondary"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-medium">{reporting.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {reporting.longitude}, {reporting.latitude}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reporting.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
