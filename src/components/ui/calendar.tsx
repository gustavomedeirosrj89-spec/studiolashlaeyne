"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white w-full max-w-full overflow-hidden", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 w-full",
        month_caption: "flex justify-center pt-1 relative items-center h-10 mb-2",
        caption_label: "text-sm font-bold text-foreground",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-100 absolute left-1 z-10 border-primary/20 text-primary hover:bg-primary/10"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-100 absolute right-1 z-10 border-primary/20 text-primary hover:bg-primary/10"
        ),
        month_grid: "w-full border-collapse border-none",
        weekdays: "flex w-full justify-between mb-2",
        weekday: "text-muted-foreground w-full font-bold text-[10px] uppercase flex items-center justify-center tracking-widest opacity-50",
        week: "flex w-full mt-1 justify-between",
        day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full flex justify-center",
        day_button: cn(
          "h-9 w-9 md:h-10 md:w-10 p-0 font-normal rounded-lg transition-all flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary aria-selected:opacity-100"
        ),
        selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-lg shadow-md",
        today: "bg-accent/20 text-accent font-bold ring-1 ring-accent/30",
        outside: "text-muted-foreground/30 opacity-50",
        disabled: "text-muted-foreground/20 opacity-20 cursor-not-allowed",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === 'left') {
            return <ChevronLeft className="h-5 w-5" />
          }
          return <ChevronRight className="h-5 w-5" />
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
