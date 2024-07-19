import { Button } from "@/components/ui/button";
import { addEventImageSchema } from "@/schemas/events.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddEventImagesDropzone from "./AddEventImagesDropzone";
import { Form } from "@/components/ui/form";
import { ResponseError } from "@/models/responseError.model";
import { addImagesToEvent } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";
import { toast } from "sonner";

interface AddEventImagesFormProps {
  refetch: () => void;
  closeDialog: () => void;
  eventId: string;
}

function AddEventImagesForm({
  closeDialog,
  eventId,
  refetch,
}: AddEventImagesFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof addEventImageSchema>>({
    resolver: zodResolver(addEventImageSchema),
  });

  const onSubmit = async (values: z.infer<typeof addEventImageSchema>) => {
    try {
      const response = await addImagesToEvent(eventId, values.images, token!);
      refetch();
      toast.success(response);
      closeDialog();
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ha ocurrido un error inesperado");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-background w-full rounded-lg"
      >
        <AddEventImagesDropzone form={form} />

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Agregar imágenes
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddEventImagesForm;
