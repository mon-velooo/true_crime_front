import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ReportingSkeletonCard() {
  return (
    <Card className="bg-card-secondary">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[150px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <div className="flex justify-between gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[30px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
