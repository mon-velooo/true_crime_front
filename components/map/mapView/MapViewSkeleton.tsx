import { Skeleton } from "@/components/ui/skeleton";

const MARKER_POSITIONS = [
  { top: 20, left: 30 },
  { top: 45, left: 65 },
  { top: 70, left: 25 },
  { top: 35, left: 80 },
  { top: 60, left: 45 },
];

export default function MapViewSkeleton() {
  return (
    <div className="relative w-full h-full">
      <Skeleton className="w-full h-64 rounded-md" />

      <div className="absolute top-2 right-2">
        <Skeleton className="h-10 w-[240px]" />
      </div>

      <div className="absolute top-2 left-2 flex flex-col gap-2">
        <Skeleton className="h-8 w-8" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {MARKER_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
          >
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
