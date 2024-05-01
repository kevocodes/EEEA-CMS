import { Event } from "@/models/events.model";
import { ResponseError } from "@/models/responseError.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${BASE_URL}/events?groupedByMonth=false`);

  if (!response.ok) {
    if (response.status === 400) {
      throw new ResponseError("Rango de meses inválido", response.status);
    }

    throw new ResponseError("Ups...Algo salió mal", response.status);
  }

  const { data } = await response.json();

  return data.events;
};
