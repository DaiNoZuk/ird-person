import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { User, LoginPayload } from "../types/index";

type AuthState = {
  user: User | null;
  accessToken: string | null;   // ควรเก็บใน memory/HttpOnly cookie ในโปรดักชัน
  remember: boolean;
};

type AuthActions = {
  login: (payload: LoginPayload) => void;
  logout: () => void;
  setUser: (u: User | null) => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        remember: false,

        login: ({ user, accessToken, remember }) =>
          set({
            user,
            accessToken: remember ? accessToken : null,
            remember,
          }),

        logout: () => set({ user: null, accessToken: null, remember: false }),

        setUser: (user) => set({ user: user }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        // เก็บเฉพาะของที่จำเป็น
        partialize: (state) => ({
          user: state.user,
          remember: state.remember,
          accessToken: state.remember ? state.accessToken : null,
        }),
      }
    )
  )
);