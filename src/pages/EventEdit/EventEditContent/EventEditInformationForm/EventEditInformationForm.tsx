import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResponseError } from "@/models/responseError.model";
import { editEventSchema } from "@/schemas/events.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import EventEditFormDatePicker from "./components/EventEditFormDatePicker";
import EventImageDropzone from "./components/EventEditImageDropzone";
import { LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventDetail } from "@/models/events.model";
import { updateEvent, updateEventStatus } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";

interface EventEditInformationFormProps {
  event: EventDetail;
  thumbnail: File;
}

function EventEditInformationForm({
  event,
  thumbnail,
}: EventEditInformationFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: event.title,
      location: event.location,
      datetime: new Date(event.datetime),
      status: event.completed ? "completed" : "pending",
      thumbnail: [thumbnail],
    },
  });

  const onSubmit = async (values: z.infer<typeof editEventSchema>) => {
    try {
      await Promise.all([
        updateEvent(event.id, values, token!),
        updateEventStatus(event.id, values.status === "completed", token!),
      ]);

      toast.success("Evento actualizado correctamente");
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-background w-full p-8 rounded-lg"
      >
        <EventImageDropzone form={form} />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Día del niño" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="En las instalaciones de la escuela"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => <EventEditFormDatePicker field={field} />}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Estado</FormLabel>..
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EventEditInformationForm;
