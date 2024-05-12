import { UserDB } from "@/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface usersState {
  users: UserDB[];
  setUsers: (users: UserDB[]) => void;
  deleteUser: (usersId: string) => void;
}

export const useUsers = create<usersState>()(
  devtools((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    deleteUser: (usersId) =>
      set((state) => ({
        users: state.users.filter((users) => users.id !== usersId),
      })),
  }))
);
