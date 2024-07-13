import { User, UserDB } from "@/models/user.model";

export const createAppUserFromResponseUser = (responseUser: UserDB): User => {
  return {
    email: responseUser.email,
    lastname: responseUser.lastname,
    name: responseUser.name,
    role: responseUser.role,
    emailVerified: responseUser.emailVerified,
  };
};
