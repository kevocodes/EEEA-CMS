import { ResponseError } from "@/models/responseError.model";
import { UserDB } from "@/models/user.model";
import { createUserSchema } from "@/schemas/users.schema";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (token: string): Promise<UserDB[]> => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  const { data } = await response.json();

  return data;
};

export const createUser = async (
  user: z.infer<typeof createUserSchema>,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new ResponseError("Usuario ya existe", response.status);
    }

    throw new ResponseError("Error al crear el usuario", response.status);
  }

  return "Usuario creado con éxito";
};

export const deleteUser = async (
  userId: string,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuario no encontrado");
    }

    throw new Error("Error al eliminar el usuario");
  }

  return "Usuario eliminado con éxito";
};
