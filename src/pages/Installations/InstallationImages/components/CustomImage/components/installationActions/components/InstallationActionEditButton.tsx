import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

interface InstallationActionEditButtonProps {
  installationId: string;
}

function InstallationActionEditButton({
  installationId,
}: InstallationActionEditButtonProps) {
  return (
    <Link to={`${PRIVATE_ROUTES.INSTALLATIONS_EDIT}/${installationId}`}>
      <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
    </Link>
  );
}

export default InstallationActionEditButton;
