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
import { ActivityDetail } from "@/models/activities.model";
import { editActivitySchema } from "@/schemas/activities.schema";
import ActivityEditFormDatePicker from "./components/ActivityEditFormDatePicker";
import { updateActivity } from "@/services/activities.service";
import { Switch } from "@/components/ui/switch";

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
      isAllDay: activity.isAllDay,
    },
  });

  const onSubmit = async (values: z.infer<typeof editActivitySchema>) => {
    try {
      const response = await updateActivity(activity.id, values, token!);
      toast.success(response);
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
          name="isAllDay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>¿Es todo el día?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <ActivityEditFormDatePicker field={field} state={form.watch} />
          )}
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
          <Skeleton className="w-full h-[41.6px] bg-muted rounded-lg" />
        </div>
        
        <div className="flex-1">
          <Skeleton className="w-full h-[58px] bg-muted rounded-lg" />
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <Skeleton className="w-full h-9 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
