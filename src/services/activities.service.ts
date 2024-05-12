import { Activity, ActivityDetail } from "@/models/activities.model";
import { ResponseError } from "@/models/responseError.model";
import {
  createActivitySchema,
  editActivitySchema,
} from "@/schemas/activities.schema";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getActivities = async (year: string = ""): Promise<Activity[]> => {
  const query = new URLSearchParams();

  query.append("groupedByMonth", "false");
  query.append("order", "desc");

  if (year) {
    query.append("year", year);
  }

  const response = await fetch(`${BASE_URL}/activities?${query.toString()}`);

  if (!response.ok) {
    if (response.status === 400) {
      throw new ResponseError("Rango de meses inválido", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data.activities;
};

export const getActivityById = async (
  activityId: string
): Promise<ActivityDetail> => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Actividad no encontrada", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const createActivity = async (
  activity: z.infer<typeof createActivitySchema>,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Actividad creada con éxito";
};

export const updateActivity = async (
  activityId: string,
  activity: z.infer<typeof editActivitySchema>,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Actividad no encontrada", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Actividad actualizada con éxito";
};

export const deleteActivity = async (
  activityId: string,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Actividad no encontrada", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Actividad eliminada con éxito";
};
