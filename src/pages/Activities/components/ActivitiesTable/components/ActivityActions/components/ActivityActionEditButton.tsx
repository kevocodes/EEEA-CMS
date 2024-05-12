import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Activity } from "@/models/activities.model";
import { Link } from "react-router-dom";

interface ActivityActionEditButtonProps {
  activity: Activity;
}

function ActivityActionEditButton({ activity }: ActivityActionEditButtonProps) {
  return (
    <Link to={`${PRIVATE_ROUTES.ACTIVITIES_EDIT}/${activity.id}`}>
      <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
    </Link>
  );
}

export default ActivityActionEditButton;
