import { Installation } from "@/models/installations.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface installationsState {
  installations: Installation[];
  setInstallations: (installations: Installation[]) => void;
  deleteInstallation: (installationId: string) => void;
  deleteAllInstallations: () => void;
}

export const useInstallations = create<installationsState>()(
  devtools((set) => ({
    installations: [],
    setInstallations: (installations) => set({ installations }),
    deleteInstallation: (installationId) =>
      set((state) => ({
        installations: state.installations.filter(
          (installation) => installation.id !== installationId
        ),
      })),
    deleteAllInstallations: () => set({ installations: [] }),
  }))
);
