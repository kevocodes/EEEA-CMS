import { Event } from "@/models/events.model";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface eventsState {
  events: Event[];
  yearFilter: string;
  setEvents: (events: Event[]) => void;
  deleteEvent: (eventId: string) => void;
  setYearFilter: (year: string) => void;
}

export const useEvents = create<eventsState>()(
  devtools((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
    deleteEvent: (eventId) =>
      set((state) => ({
        events: state.events.filter((event) => event.id !== eventId),
      })),
    yearFilter: dayjs().year().toString(),
    setYearFilter: (year) => set({ yearFilter: year }),
  }))
);
