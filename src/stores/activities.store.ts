import { Activity } from "@/models/activities.mode";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface activitesState {
  activities: Activity[];
  yearFilter: string;
  setActivities: (activities: Activity[]) => void;
  deleteActivity: (activityId: string) => void;
  setYearFilter: (year: string) => void;
}

export const useActivities = create<activitesState>()(
  devtools((set) => ({
    activities: [],
    setActivities: (activities) => set({ activities }),
    deleteActivity: (activityId) =>
      set((state) => ({
        activities: state.activities.filter(
          (activity) => activity.id !== activityId
        ),
      })),
    yearFilter: dayjs().year().toString(),
    setYearFilter: (year) => set({ yearFilter: year }),
  }))
);
