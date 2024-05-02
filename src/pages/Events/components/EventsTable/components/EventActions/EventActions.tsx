import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EventImagesViewer from "../EventImagesViewer";
import { Event } from "@/models/events.model";
import EventActionDeleteButton from "./components/EventActionDeleteButton";
import { Dialog } from "@/components/ui/dialog";
import EventActionDeleteDialog from "./components/EventActionDeleteDialog";
import { useState } from "react";

interface EventActionsProps {
  event: Event;
}

function EventActions({ event }: EventActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <EventImagesViewer completed={event.completed} images={event.images} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions menu</span>
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <EventActionDeleteButton />
        </DropdownMenuContent>
      </DropdownMenu>
      <EventActionDeleteDialog
        eventId={event.id}
        setOpen={setIsDeleteDialogOpen}
      />
    </Dialog>
  );
}

export default EventActions;
