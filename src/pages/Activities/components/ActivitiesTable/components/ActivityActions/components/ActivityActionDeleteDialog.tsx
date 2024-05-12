import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponseError } from "@/models/responseError.model";
import { deleteActivity } from "@/services/activities.service";
import { useActivities } from "@/stores/activities.store";
import { useAuth } from "@/stores/auth.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ActivityActionDeleteDialogProps {
  activityId: string;
  setOpen: (open: boolean) => void;
}

function ActivityActionDeleteDialog({
  activityId,
  setOpen,
}: ActivityActionDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const token = useAuth((state) => state.token);
  const deleteActivityFromUI = useActivities((state) => state.deleteActivity);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteActivity(activityId, token!);
      toast.success(response);
      setOpen(false);
      deleteActivityFromUI(activityId);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Estas seguro/a que deseas eliminar la actividad?
        </DialogTitle>
        <DialogDescription>
          Esta acción no puede ser revertida. La actividad será completamente
          eliminada y no podrá recuperarse.
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

export default ActivityActionDeleteDialog;
