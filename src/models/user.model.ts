export interface User {
  email: string;
  name: string;
  role: Role;
  lastname: string;
}

export enum Role {
  ADMIN = "ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
}