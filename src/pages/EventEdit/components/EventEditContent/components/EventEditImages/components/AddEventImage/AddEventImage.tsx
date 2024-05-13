import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEventImagesForm from "./components/AddEventImagesForm";
import { Event } from "@/models/events.model";

interface AddEventImageProps {
  event: Event;
  refetch: () => void;
}

function AddEventImage({ event, refetch }: AddEventImageProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit">
          <Plus size={16} className="mr-2" />
          Agregar imágenes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Añadir imágenes al evento</DialogTitle>
        </DialogHeader>

        <AddEventImagesForm
          closeDialog={closeDialog}
          eventId={event.id}
          refetch={refetch}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddEventImage;
