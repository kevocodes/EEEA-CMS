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
import { createEventSchema } from "@/schemas/events.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import EventCreateFormDatePicker from "./components/EventCreateFormDatePicker";
import EventImageDropzone from "./components/EventCreateImageDropzone";
import { LoaderCircle } from "lucide-react";
import { createEvent } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";

function EventCreateForm() {
  const navigate = useNavigate();
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    try {
      const respose = await createEvent(values, token!);
      toast.success(respose);
      navigate(PRIVATE_ROUTES.EVENTS);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ha ocurrido un error inesperado");
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

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => <EventCreateFormDatePicker field={field} />}
        />

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Crear evento
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EventCreateForm;
