import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponseError } from "@/models/responseError.model";
import { deleteUser } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUsers } from "@/stores/users.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserActionDeleteDialogProps {
  userId: string;
  setOpen: (open: boolean) => void;
}

function UserActionDeleteDialog({
  userId,
  setOpen,
}: UserActionDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const token = useAuth((state) => state.token);

  const deleteUserFromUI = useUsers((state) => state.deleteUser);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteUser(userId, token!);
      toast.success(response);
      deleteUserFromUI(userId);
      setOpen(false);
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
          Estas seguro/a que deseas eliminar el usuario?
        </DialogTitle>
        <DialogDescription>
          Esta acción no puede ser revertida. El usuario será completamente
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

export default UserActionDeleteDialog;
