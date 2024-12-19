import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function KpiSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[150px]" />
        </CardTitle>
        <CardDescription>
          <div>
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
