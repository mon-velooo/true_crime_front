"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportingData } from "@/types/reportings";
import { fetchReportings } from "@/services/reportings/fetchReportings";
import { ScrollArea } from "../ui/scroll-area";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ReportingCard } from "./ReportingCard";
import Grid from "../layout/Grid/Grid";
import { ReportingSkeletonCard } from "../skeletons/ReportingSkeletonCard";

export const ReportingsList = () => {
  const { toast } = useToast();
  const SOCKET_URL = "http://localhost:5001";

  const { data, isLoading } = useQuery<ReportingData[]>({
    queryKey: ["reportings"],
    queryFn: () => fetchReportings(),
  });

  const [reportings, setReportings] = useState<ReportingData[]>(data || []);

  useEffect(() => {
    if (data) {
      setReportings(data);
    }
  }, [data]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("newReporting", (newReporting: ReportingData) => {
      setReportings((prevReportings) => [...prevReportings, newReporting]);
      toast({
        title: "Nouveau Reporting",
        description: `${newReporting.description}`,
      });
    });

    return () => {
      console.log("Cleaning up WebSocket connection...");
      socket.off("newReporting");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-185px)]">
          <Grid
            cols={{
              mobile: 1,
              tablet: 2,
              desktop: 2,
            }}
            gap={4}
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <ReportingSkeletonCard key={`skeleton-${index}`} />
                ))
              : reportings?.map((reporting) => (
                  <ReportingCard
                    key={reporting.id}
                    id={reporting.id}
                    status={reporting.status}
                    description={reporting.description}
                    latitude={reporting.latitude}
                    longitude={reporting.longitude}
                  />
                ))}
          </Grid>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card-secondary to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
