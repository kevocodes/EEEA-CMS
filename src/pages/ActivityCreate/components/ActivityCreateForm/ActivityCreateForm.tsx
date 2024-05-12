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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { createActivitySchema } from "@/schemas/activities.schema";
import ActivityCreateFormDatePicker from "./components/ActivityCreateFormDatePicker";
import { createActivity } from "@/services/activities.service";

function ActivityCreateForm() {
  const navigate = useNavigate();
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createActivitySchema>>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createActivitySchema>) => {
    try {
      const respose = await createActivity(values, token!);
      toast.success(respose);
      navigate(PRIVATE_ROUTES.ACTIVITIES);
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Primeras evaluaciones" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => <ActivityCreateFormDatePicker field={field} />}
        />

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Crear actividad
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ActivityCreateForm;
