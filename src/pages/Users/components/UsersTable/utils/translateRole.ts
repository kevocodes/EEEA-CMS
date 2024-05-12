import { Role } from "@/models/user.model";

export const translateRole = (role: Role) => {
  const roles = {
    [Role.ADMIN]: "Administrador",
    [Role.CONTENT_MANAGER]: "Gestor de Contenido",
  };

  return roles[role];
};
