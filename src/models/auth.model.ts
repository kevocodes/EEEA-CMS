import { UserDB } from "@/models/user.model";

export interface LoginResponse {
  access_token: string;
  user: UserDB;
}