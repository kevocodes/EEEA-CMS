import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Activity } from "@/models/activities.mode";
import { Link } from "react-router-dom";

interface ActivityActionEditButtonProps {
  activity: Activity;
}

function ActivityActionEditButton({ activity }: ActivityActionEditButtonProps) {
  return (
    <Link to={`/activities/edit/${activity.id}`}>
      <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
    </Link>
  );
}

export default ActivityActionEditButton;
