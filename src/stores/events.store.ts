import { Event } from "@/models/events.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface eventsState {
  events: Event[];
  setEvents: (events: Event[]) => void;
  deleteEvent: (eventId: string) => void;
}

export const useEvents = create<eventsState>()(
  devtools((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
    deleteEvent: (eventId) =>
      set((state) => ({
        events: state.events.filter((event) => event.id !== eventId),
      })),
  }))
);
