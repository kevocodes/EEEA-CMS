import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Activity } from "@/models/activities.mode";
import ActivityActionDeleteButton from "./components/ActivityActionDeleteButton";
import ActivityActionEditButton from "./components/ActivityActionEditButton";
import ActivityActionDeleteDialog from "./components/ActivityActionDeleteDialog";
interface ActivityActionsProps {
  activity: Activity;
}

function ActivityActions({ activity }: ActivityActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions menu</span>
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <ActivityActionEditButton activity={activity} />
          <ActivityActionDeleteButton />
        </DropdownMenuContent>
      </DropdownMenu>
      <ActivityActionDeleteDialog
        activityId={activity.id}
        setOpen={setIsDeleteDialogOpen}
      />
    </Dialog>
  );
}

export default ActivityActions;
