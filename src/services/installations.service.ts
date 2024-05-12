import { Installation } from "@/models/installations.model";
import { ResponseError } from "@/models/responseError.model";
import { createInstallationSchema } from "@/schemas/installations.schema";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getInstallations = async (): Promise<Installation[]> => {
  const response = await fetch(`${BASE_URL}/installations`);

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const getInstallationById = async (
  installationId: string
): Promise<Installation> => {
  const response = await fetch(`${BASE_URL}/installations/${installationId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Instalación no encontrada", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data;
}

export const createInstallation = async (
  installation: z.infer<typeof createInstallationSchema>,
  token: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("name", installation.name);
  formData.append("image", installation.image[0]);

  const response = await fetch(`${BASE_URL}/installations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Instalación creada con éxito";
}

export const updateInstallation = async (
  installationId: string,
  installation: z.infer<typeof createInstallationSchema>,
  token: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("name", installation.name);
  formData.append("image", installation.image[0]);

  const response = await fetch(`${BASE_URL}/installations/${installationId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Instalación no encontrada", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Instalación actualizada con éxito";
}

export const deleteInstallation = async (
  installationId: string,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/installations/${installationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("La instalación no existe", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Instalación eliminada con éxito";
};

export const deleteAllInstallations = async (
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/installations/all`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Todas las instalaciones eliminadas con éxito";
};
