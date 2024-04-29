import { ResponseError } from "@/models/responseError.model";
import { loginSchema } from "@/schemas/login.schema";
import { z } from "zod";
import { LoginDTO, UserResponseDTO } from "@/types/auth.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signIn = async (
  loginData: z.infer<typeof loginSchema>
): Promise<LoginDTO> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new ResponseError("Credenciales incorrectas", response.status);
    }

    throw new ResponseError("Error al iniciar sesión", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const validateSession = async (token: string): Promise<UserResponseDTO> => {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Sesión no válida", response.status);
  }

  const { data } = await response.json();

  return data;
};
