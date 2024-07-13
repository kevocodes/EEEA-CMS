export interface User {
  email: string;
  name: string;
  role: Role;
  lastname: string;
  emailVerified: boolean;
}

export interface UserDB {
  id: string;
  email: string;
  name: string;
  lastname: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
}

export interface UserDBDetail extends UserDB {}

export enum Role {
  ADMIN = "ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
}
