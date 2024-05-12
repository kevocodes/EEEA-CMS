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
import { UserDB } from "@/models/user.model";
import UserActionEditButton from "./components/UserActionEditButton";
import UserActionDeleteButton from "./components/UserActionDeleteButton";
import UserActionDeleteDialog from "./components/UserActionDeleteDialog";

interface UserActionsProps {
  user: UserDB;
}

function UsersActions({ user }: UserActionsProps) {
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
          <UserActionEditButton user={user} />
          <UserActionDeleteButton />
        </DropdownMenuContent>
      </DropdownMenu>
      <UserActionDeleteDialog
        userId={user.id}
        setOpen={setIsDeleteDialogOpen}
      />
    </Dialog>
  );
}

export default UsersActions;
