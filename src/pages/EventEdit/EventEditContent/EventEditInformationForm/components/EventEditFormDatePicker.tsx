import { TimePicker } from "@/components/platform/TimePicker/TimePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { editEventSchema } from "@/schemas/events.schema";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface EventFormDatePickerProps {
  field: ControllerRenderProps<z.infer<typeof editEventSchema>, "datetime">;
}

function EventEditFormDatePicker({ field }: EventFormDatePickerProps) {
  return (
      <FormItem className="flex flex-col ">
        <FormLabel className="text-left py-[5px]">Fecha y hora</FormLabel>
        <Dialog>
          <FormControl>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  dayjs(field.value).format("DD/MM/YYYY - HH:mm")
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </DialogTrigger>
          </FormControl>
          <FormMessage />

          <DialogContent className="w-auto">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <TimePicker setDate={field.onChange} date={field.value} />
            </div>
          </DialogContent>
        </Dialog>
      </FormItem>
  );
}

export default EventEditFormDatePicker;
