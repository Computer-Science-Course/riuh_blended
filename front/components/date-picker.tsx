import React, { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns"

interface DatePickerProps {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
}) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-max justify-start text-left font-normal bg-white-900 text-black-100",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "dd/MM/yyyy") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
