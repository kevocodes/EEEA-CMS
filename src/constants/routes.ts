export enum PUBLIC_ROUTES {
  LOGIN = "/inicio-sesion",
  FORGOT_PASSWORD = "/recuperar-contrasena",
  RESET_PASSWORD = "/restablecer-contrasena",
}

export enum PRIVATE_ROUTES {
  HOME = "/",

  EVENTS = "/eventos",
  EVENTS_CREATE = "/eventos/crear",
  EVENTS_EDIT = "/eventos/editar",

  ACTIVITIES = "/actividades",
  ACTIVITIES_CREATE = "/actividades/crear",
  ACTIVITIES_EDIT = "/actividades/editar",

  INSTALLATIONS = "/instalaciones",
  INSTALLATIONS_CREATE = "/instalaciones/crear",
  INSTALLATIONS_EDIT = "/instalaciones/editar",

  USERS = "/usuarios",
  USERS_CREATE = "/usuarios/crear",
  USERS_EDIT = "/usuarios/editar",

  VERIFY_EMAIL = "/verificar-correo",
  PROFILE = "/perfil",
}

export const DEFAULT_REDIRECT = PRIVATE_ROUTES.HOME;
