import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebar = create<SidebarState>()(
  devtools(
    persist(
      (set, get) => ({
        isOpen: true,
        toggle: () => set({ isOpen: !get().isOpen }),
      }),
      { name: "sidebar" }
    )
  )
);
