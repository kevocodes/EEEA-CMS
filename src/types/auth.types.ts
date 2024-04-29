import { Role } from "@/models/user.model";

export interface LoginDTO {
  access_token: string;
  user: UserResponseDTO;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  lastname: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
