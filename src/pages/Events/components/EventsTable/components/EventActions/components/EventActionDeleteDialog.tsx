import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponseError } from "@/models/responseError.model";
import { deleteEvent } from "@/services/events.service";
import { useAuth } from "@/stores/auth.store";
import { useEvents } from "@/stores/events.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EventActionDeleteDialogProps {
  eventId: string;
  setOpen: (open: boolean) => void;
}

function EventActionDeleteDialog({
  eventId,
  setOpen,
}: EventActionDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const token = useAuth((state) => state.token);
  const deleteEventFromUI = useEvents((state) => state.deleteEvent);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteEvent(eventId, token!);
      toast.success(response);
      setOpen(false);
      deleteEventFromUI(eventId);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ha ocurrido un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Estas seguro/a que deseas eliminar el evento?</DialogTitle>
        <DialogDescription>
          Esta acción no puede ser revertida. El evento será completamente
          eliminado y no podrá recuperarse.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button className="w-full" onClick={handleDelete}>
          {loading && <LoaderCircle size={16} className="animate-spin mr-2" />}
          Eliminar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default EventActionDeleteDialog;
