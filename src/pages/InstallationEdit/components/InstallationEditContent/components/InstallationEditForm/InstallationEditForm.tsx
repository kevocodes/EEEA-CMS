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
import { InstallationDetail } from "@/models/installations.model";
import { editInstallationSchema } from "@/schemas/installations.schema";
import { updateInstallation } from "@/services/installations.service";
import InstallationEditImageDropzone from "./components/InstallationEditImageDropzone";

interface InstallationEditInformationFormProps {
  installation: InstallationDetail;
  image: File;
}

function InstallationEditInformationForm({
  installation,
  image,
}: InstallationEditInformationFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof editInstallationSchema>>({
    resolver: zodResolver(editInstallationSchema),
    defaultValues: {
      name: installation.name,
      image: [image],
    },
  });

  const onSubmit = async (values: z.infer<typeof editInstallationSchema>) => {
    try {
      const response = await updateInstallation(
        installation.id,
        values,
        token!
      );
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
        <InstallationEditImageDropzone form={form} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Cancha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
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

export default InstallationEditInformationForm;

InstallationEditInformationForm.skeleton =
  function EventEditInformationFormSkeleton() {
    return (
      <div className="w-full p-8 rounded-lg space-y-8 bg-background">
        <Skeleton className="w-full h-60 rounded-lg bg-muted" />
        <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />
        <div className="flex gap-2">
          <div className="w-full">
            <Skeleton className="w-full h-9 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
