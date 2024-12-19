import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function DistrictGraphSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="w-[236px] h-[36px]" />
          <Skeleton className="w-[180px] h-[36px]" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-[648px] h-[364px]" />
      </CardContent>
    </Card>
  );
}
