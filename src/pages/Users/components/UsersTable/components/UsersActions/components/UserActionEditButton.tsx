import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { UserDB } from "@/models/user.model";
import { Link } from "react-router-dom";

interface UserActionEditButtonProps {
  user: UserDB;
}

function UserActionEditButton({ user }: UserActionEditButtonProps) {
  return (
    <Link to={`${PRIVATE_ROUTES.USERS_EDIT}/${user.id}`}>
      <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
    </Link>
  );
}

export default UserActionEditButton;
