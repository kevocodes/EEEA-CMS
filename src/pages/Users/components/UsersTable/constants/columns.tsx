import { ColumnDef } from "@tanstack/react-table";
import { Role, UserDB } from "@/models/user.model";
import { translateRole } from "../utils/translateRole";
import { Badge } from "@/components/ui/badge";
import UsersActions from "../components/UsersActions/UsersActions";

export const usersColumns: ColumnDef<UserDB>[] = [
  {
    accessorKey: "email",
    header: "Correo Electrónico",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastname",
    header: "Apellido",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const user = row.original;

      return user.role === Role.ADMIN ? (
        <Badge variant="default">{translateRole(user.role)}</Badge>
      ) : (
        <Badge variant="outline">{translateRole(user.role)}</Badge>
      );
    },
    filterFn: (row, id, filterValue) => {
      const value = row.getValue(id) as Role;

      return filterValue.includes(value);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <UsersActions user={user} />;
    },
  },
];
