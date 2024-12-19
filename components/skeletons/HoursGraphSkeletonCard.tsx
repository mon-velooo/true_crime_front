import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function HoursGraphSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-[16px]" />
        <CardDescription>
          <Skeleton className="h-[20px]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[346px]" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-[16px]" />
      </CardFooter>
    </Card>
  );
}
