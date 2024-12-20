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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerWithRangeProps {
  selected: Date;
  onSelect: (date: Date | undefined) => void;
  startDate: string;
  endDate: string;
}

export function DatePickerWithRange({
  selected,
  onSelect,
  startDate,
  endDate,
}: DatePickerWithRangeProps) {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            defaultMonth={new Date(endDate)}
            disabled={(date) =>
              date < new Date(startDate) || date > new Date(endDate)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
