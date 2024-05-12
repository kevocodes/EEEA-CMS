export const PUBLIC_ROUTES = {
  LOGIN: "/inicio-sesion",
  UNAUTHORIZED: "/no-autorizado",
};

export const PRIVATE_ROUTES = {
  HOME: "/",
  
  EVENTS: "/eventos",
  EVENTS_CREATE: "/eventos/crear",
  EVENTS_EDIT: "/eventos/editar",

  ACTIVITIES: "/actividades",
  ACTIVITIES_CREATE: "/actividades/crear",
  ACTIVITIES_EDIT: "/actividades/editar",
  
  INSTALLATIONS: "/instalaciones",
  INSTALLATIONS_CREATE: "/instalaciones/crear",
  INSTALLATIONS_EDIT: "/instalaciones/editar",

  USERS: "/usuarios",
  USERS_CREATE: "/usuarios/crear",
  USERS_EDIT: "/usuarios/editar",
};

export const DEFAULT_REDIRECT = PRIVATE_ROUTES.HOME;