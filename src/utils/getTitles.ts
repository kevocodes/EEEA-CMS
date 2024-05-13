import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";

type Route = PUBLIC_ROUTES | PRIVATE_ROUTES;

export const getTitles = (route: Route) => {
  const titles = {
    [PUBLIC_ROUTES.LOGIN]: "Inicio de Sesión",
    [PRIVATE_ROUTES.HOME]: "Inicio",
    [PRIVATE_ROUTES.EVENTS]: "Eventos",
    [PRIVATE_ROUTES.EVENTS_CREATE]: "Crear Evento",
    [PRIVATE_ROUTES.EVENTS_EDIT]: "Editar Evento",
    [PRIVATE_ROUTES.ACTIVITIES]: "Actividades",
    [PRIVATE_ROUTES.ACTIVITIES_CREATE]: "Crear Actividad",
    [PRIVATE_ROUTES.ACTIVITIES_EDIT]: "Editar Actividad",
    [PRIVATE_ROUTES.INSTALLATIONS]: "Instalaciones",
    [PRIVATE_ROUTES.INSTALLATIONS_CREATE]: "Crear Instalación",
    [PRIVATE_ROUTES.INSTALLATIONS_EDIT]: "Editar Instalación",
    [PRIVATE_ROUTES.USERS]: "Usuarios",
    [PRIVATE_ROUTES.USERS_CREATE]: "Crear Usuario",
    [PRIVATE_ROUTES.USERS_EDIT]: "Editar Usuario",
    [PRIVATE_ROUTES.PROFILE]: "Perfil",
  };

  return titles[route];
};
