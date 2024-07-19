import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Event } from "@/models/events.model";
import { ResponseError } from "@/models/responseError.model";
import { deleteAllEventImages } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteAllImagesButtonProps {
  event: Event;
  refetch: () => void;
}

function DeleteAllImagesButton({ event, refetch }: DeleteAllImagesButtonProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const token = useAuth((state) => state.token);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteAllEventImages(event.id, token!);
      toast.success(response);
      refetch();
      setOpen(false);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ha ocurrido un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit" variant="default">
          <Trash2 size={16} className="mr-2" />
          Eliminar todas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Estas seguro/a que deseas eliminar todas las Imágenes del evento?
          </DialogTitle>
          <DialogDescription>
            Esta acción no puede ser revertida. Las imágenes serán completamente
            eliminadas y no podrán recuperarse.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" onClick={handleDelete}>
            {loading && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAllImagesButton;
