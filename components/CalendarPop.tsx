import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Props = {
    date : Date 
    setDate : (date : Date | undefined ) => void 
}

export const  CalendarPop : React.FC<Props> = ({date, setDate}) => {

    
        
       
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full border-none bg-transparent justify-start text-left font-normal text-xs h-6",
                  !date && "text-muted-foreground"
                )}
              >
                
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )
      


}