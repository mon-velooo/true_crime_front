"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  onDateChange?: (date: DateRange) => void;
  value?: DateRange;
}

export function DateRangePicker({ onDateChange, value }: DateRangePickerProps) {
  const realToday = new Date();
  const start = new Date("03-12-2024");
  const threeMonthsAgo = subMonths(realToday, 3);

  const [date, setDate] = React.useState<DateRange>(
    value || {
      from: start,
      to: start,
    }
  );

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range || (!range.from && !range.to)) {
      return;
    }

    const newRange = {
      from: range.from || date.from,
      to: range.to || range.from || date.from,
    };

    // Ensure dates are within bounds
    if (newRange.from < start) newRange.from = start;
    if (newRange.to > threeMonthsAgo) newRange.to = threeMonthsAgo;

    setDate(newRange);
    onDateChange?.(newRange);
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from && (
              <>
                {format(date.from, "LLL dd, y")}
                {date.to && date.to !== date.from && (
                  <> - {format(date.to, "LLL dd, y")}</>
                )}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            defaultMonth={threeMonthsAgo}
            fromDate={start}
            toDate={threeMonthsAgo}
            disabled={(date) => date < start || date > threeMonthsAgo}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
