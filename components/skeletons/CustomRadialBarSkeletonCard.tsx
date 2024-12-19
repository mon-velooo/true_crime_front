import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function CustomRadialBarSkeletonCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <Skeleton className="h-4 w-[150px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-3 w-[100px] mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <div className="aspect-square w-full max-w-[250px] flex items-center justify-center">
          <Skeleton className="h-[200px] w-[200px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div>
          <Skeleton className="h-3 w-[250px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
