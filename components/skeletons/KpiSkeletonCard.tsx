import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function KpiSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[150px]" />
        </CardTitle>
        <CardDescription>
          <div className="mt-10">
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
