import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EventActivitySkeleton() {
  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-520px)]">
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="p-4 rounded-md border border-border-secondary bg-card-secondary"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="space-y-0.5">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>

                <div className="border-t border-border-secondary pt-2 mt-2">
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card-secondary to-transparent pointer-events-none" />
    </div>
  );
}
