import { ThumbnailImageProps } from "react-grid-gallery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "@/stores/auth.store";
import { deleteEventImage } from "@/services/events.service";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";

function CustomImage({
  imageProps: { src, style },
  item: { key },
  refetch,
}: ThumbnailImageProps & { refetch: () => void }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const token = useAuth((state) => state.token);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteEventImage(String(key), token!);
      refetch();
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
    <div className="relative">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="absolute top-2 right-2" asChild>
          <Button variant="destructive" size={"icon"}>
            <Trash2 size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Estas seguro/a que deseas eliminar la imagen del evento?
            </DialogTitle>
            <DialogDescription>
              Esta acción no puede ser revertida. La imagen será completamente
              eliminada y no podrá recuperarse.
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
      <img
        alt="Event image"
        src={src}
        style={style}
        key={key}
        className="pointer-events-none"
      />
    </div>
  );
}

export default CustomImage;
