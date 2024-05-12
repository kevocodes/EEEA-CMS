import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function ActivityActionDeleteButton() {
  return (
    <>
      <DialogTrigger asChild>
        <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
          Eliminar
        </DropdownMenuItem>
      </DialogTrigger>
    </>
  );
}

export default ActivityActionDeleteButton;
