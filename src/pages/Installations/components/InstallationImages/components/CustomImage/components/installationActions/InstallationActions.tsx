import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import InstallationActionDeleteButton from "./components/InstallationActionDeleteButton";
import InstallationActionDeleteDialog from "./components/InstallationActionDeleteDialog";
import InstallationActionEditButton from "./components/InstallationActionEditButton";

interface InstallationActionsProps {
  installationId: string;
}

function InstallationActions({ installationId }: InstallationActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-1 top-1">
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions menu</span>
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <InstallationActionEditButton installationId={installationId} />
          <InstallationActionDeleteButton />
        </DropdownMenuContent>
      </DropdownMenu>

      <InstallationActionDeleteDialog installationId={installationId} setOpen={setOpen} />
    </Dialog>
  );
}

export default InstallationActions;
