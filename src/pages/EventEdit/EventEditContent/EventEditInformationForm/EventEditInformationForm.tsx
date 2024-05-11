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
import { Skeleton } from "@/components/ui/skeleton";

interface EventEditInformationFormProps {
  event: EventDetail;
  thumbnail: File;
  refetch: () => void;
  setIsDisabledTabs: (value: boolean) => void;
}

function EventEditInformationForm({
  event,
  thumbnail,
  refetch,
  setIsDisabledTabs
}: EventEditInformationFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: event.title,
      location: event.location,
      datetime: new Date(event.datetime), // Convert string to Date
      status: event.completed ? "completed" : "pending", // Convert boolean to string
      thumbnail: [thumbnail],
    },
  });

  const onSubmit = async (values: z.infer<typeof editEventSchema>) => {
    try {
      // Disable tabs while submitting form
      setIsDisabledTabs(true);

      // Update event in DB
      await Promise.all([
        updateEvent(event.id, values, token!),
        updateEventStatus(event.id, values.status === "completed", token!),
      ]);

      // Update event state in UI
      refetch();

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
                    <SelectItem value="pending" className="cursor-pointer">
                      Pendiente
                    </SelectItem>
                    <SelectItem value="completed" className="cursor-pointer">
                      Completado
                    </SelectItem>
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

EventEditInformationForm.skeleton =
  function EventEditInformationFormSkeleton() {
    return (
      <div className="w-full p-8 rounded-lg space-y-8 bg-background">
        <Skeleton className="w-full h-64 rounded-lg bg-muted" />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Skeleton className="w-full h-8 bg-muted rounded-lg" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-full h-8 bg-muted rounded-lg" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Skeleton className="w-full h-8 bg-muted rounded-lg" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-full h-8 bg-muted rounded-lg" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <Skeleton className="w-full h-8 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
