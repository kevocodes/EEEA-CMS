import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Event } from "@/models/events.model";
import { Link } from "react-router-dom";

interface EventActionEditButtonProps {
  event: Event;
}

function EventActionEditButton({ event }: EventActionEditButtonProps) {
  return (
    <Link to={`${PRIVATE_ROUTES.EVENTS_EDIT}/${event.id}`}>
      <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
    </Link>
  );
}

export default EventActionEditButton;
