import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function HoursGraphSkeletonCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[150px] mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <div className="leading-none text-muted-foreground">
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
