import { User } from "@/models/user.model";
import { UserResponseDTO } from "@/types/auth.types";

export const createAppUserFromResponseUser = (responseUser: UserResponseDTO): User => {
  return {
    email: responseUser.email,
    lastname: responseUser.lastname,
    name: responseUser.name,
    role: responseUser.role,
  };
};
