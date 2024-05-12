export interface User {
  email: string;
  name: string;
  role: Role;
  lastname: string;
}

export interface UserDB {
  id: string;
  email: string;
  name: string;
  lastname: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  ADMIN = "ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
}
