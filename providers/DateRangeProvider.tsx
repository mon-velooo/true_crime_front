"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { format, subMonths } from "date-fns";

interface DateRangeContextType {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  dates: {
    startDate: string;
    endDate: string;
  };
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const start = new Date("03-05-2024");
  const today = new Date();
  const threeMonthsAgo = subMonths(today, 3);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: start,
    to: threeMonthsAgo,
  });

  const dates = useMemo(() => {
    const startDate = dateRange?.from
      ? format(dateRange.from, "MM-dd-yyyy")
      : "";
    return {
      startDate,
      endDate: dateRange?.to ? format(dateRange.to, "MM-dd-yyyy") : startDate,
    };
  }, [dateRange]);

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange, dates }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context)
    throw new Error("useDateRange must be used within DateRangeProvider");
  return context;
};
