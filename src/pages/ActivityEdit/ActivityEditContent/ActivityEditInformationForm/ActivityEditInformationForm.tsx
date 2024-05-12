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
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityDetail } from "@/models/activities.mode";
import { editActivitySchema } from "@/schemas/activities.schema";
import ActivityEditFormDatePicker from "./components/ActivityEditFormDatePicker";
import { updateActivity } from "@/services/activities.service";

interface ActivityEditInformationFormProps {
  activity: ActivityDetail;
}

function ActivityEditInformationForm({
  activity,
}: ActivityEditInformationFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof editActivitySchema>>({
    resolver: zodResolver(editActivitySchema),
    defaultValues: {
      title: activity.title,
      datetime: new Date(activity.datetime), // Convert string to Date
    },
  });

  const onSubmit = async (values: z.infer<typeof editActivitySchema>) => {
    try {
      const response = await updateActivity(activity.id, values, token!);
      toast.success(response);
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
                <Input placeholder="Día del niño" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => <ActivityEditFormDatePicker field={field} />}
        />

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

export default ActivityEditInformationForm;

ActivityEditInformationForm.skeleton =
  function EventEditInformationFormSkeleton() {
    return (
      <div className="w-full p-8 rounded-lg space-y-8 bg-background">
        <div className="flex-1">
          <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />
        </div>
        <div className="flex-1">
          <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <Skeleton className="w-full h-9 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
