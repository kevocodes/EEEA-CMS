import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponseError } from "@/models/responseError.model";
import { deleteInstallation } from "@/services/installations.service";
import { useAuth } from "@/stores/auth.store";
import { useInstallations } from "@/stores/installations.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface InstallationDeleteDialogProps {
  installationId: string;
  setOpen: (open: boolean) => void;
}

function InstallationActionDeleteDialog({
  installationId,
  setOpen,
}: InstallationDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const token = useAuth((state) => state.token);

  const deleteInstallationFromUI = useInstallations(
    (state) => state.deleteInstallation
  );

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteInstallation(installationId, token!);
      deleteInstallationFromUI(installationId);
      toast.success(response);
      setOpen(false);
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
        <DialogTitle>
          Estas seguro/a que deseas eliminar la instalación?
        </DialogTitle>
        <DialogDescription>
          Esta acción no puede ser revertida. La instalación será completamente
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

export default InstallationActionDeleteDialog;
