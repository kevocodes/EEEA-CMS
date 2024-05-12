import { Activity } from "@/models/activities.model";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface activitiesState {
  activities: Activity[];
  yearFilter: string;
  setActivities: (activities: Activity[]) => void;
  deleteActivity: (activityId: string) => void;
  setYearFilter: (year: string) => void;
}

export const useActivities = create<activitiesState>()(
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
