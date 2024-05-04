import { Event, EventDetail } from "@/models/events.model";
import { ResponseError } from "@/models/responseError.model";
import { createEventSchema, editEventSchema } from "@/schemas/events.schema";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(
    `${BASE_URL}/events?groupedByMonth=false&order=desc`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new ResponseError("Rango de meses inválido", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data.events;
};

export const getEventById = async (
  eventId: string,
  token: string
): Promise<EventDetail> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Evento no encontrado", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const createEvent = async (
  event: z.infer<typeof createEventSchema>,
  token: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("title", event.title);
  formData.append("location", event.location);
  formData.append("datetime", event.datetime.toISOString());
  formData.append("thumbnail", event.thumbnail[0]);

  console.log(formData);

  const response = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Evento creado con éxito";
};

export const updateEvent = async (
  eventId: string,
  event: z.infer<typeof editEventSchema>,
  token: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("title", event.title);
  formData.append("location", event.location);
  formData.append("datetime", event.datetime.toISOString());
  formData.append("thumbnail", event.thumbnail[0]);
  // formData.append("completed", event.status === "completed" ? "true" : "false");

  const response = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new ResponseError("Rango de meses inválido", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Evento actualizado con éxito";
};

export const updateEventStatus = async (
  eventId: string,
  completed: boolean,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Estado del evento actualizado con éxito";
};

export const deleteEvent = async (
  eventId: string,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  return "Evento eliminado con éxito";
};
