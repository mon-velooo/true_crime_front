"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportingData } from "@/types/reportings";
import { fetchReportings } from "@/services/reportings/fetchReportings";
import { ScrollArea } from "../ui/scroll-area";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ReportingsList = () => {
  const {toast} = useToast();
  const SOCKET_URL = "http://localhost:5001"; 

  const { data, isLoading } = useQuery<ReportingData[]>({
    queryKey: ["reportings"],
    queryFn: () => fetchReportings(),
  });

  const [reportings, setReportings] = useState<ReportingData[]>(data || []);

  useEffect(()=>{
    if(data){
      setReportings(data)
    }
  },[data])

  useEffect(() => {

    const socket = io(SOCKET_URL);

    socket.on("newReporting", (newReporting: ReportingData) => {
      setReportings((prevReportings) => [...prevReportings, newReporting]);
      toast({
        title: "Nouveau Reporting",
        description: `${newReporting.description}`
      })
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
        <ScrollArea className="h-[calc(100vh-510px)]">
          <div className="space-y-4">
            {reportings?.map((reporting) => (
              <div
                key={reporting.id}
                className="p-4 rounded-md transition-colors cursor-pointer border border-border-secondary"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-medium">{reporting.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {reporting.longitude}, {reporting.latitude}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reporting.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
