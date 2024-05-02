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
import EventImageDropzone from "./components/EventImageDropzone";
import { LoaderCircle } from "lucide-react";
import { createEvent } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";
import { Link } from "react-router-dom";

function EventCreateForm() {
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
      form.reset();
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
        className="space-y-8 bg-background w-full p-8 max-w-3xl rounded-lg"
      >
        <EventImageDropzone form={form} />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => <EventCreateFormDatePicker field={field} />}
        />

        <div className="flex gap-2">
          <Link to="/events" className="w-full">
            <Button type="button" className="w-full" variant="outline">
              Cancelar
            </Button>
          </Link>

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EventCreateForm;
