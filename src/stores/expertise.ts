import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import expertiseMock from "../data/mock_expertise.json";
import type { Expertise } from "../types";

interface ExpertiseStore {
  expertise: Expertise[];
  addExpertise: (p: Expertise) => void;
  updateExpertise: (id: number, dataUpdate: Expertise) => void;
  removeExpertise: (id: number) => void;
  nextId: () => number;
}

export const useExpertiseStore = create<ExpertiseStore>()(
  devtools(
    persist(
      (set, get) => ({
        expertise: expertiseMock,
        addExpertise: (newExpertise: Expertise) =>
          set((state) => ({
            expertise: [...state.expertise, newExpertise],
          })),
        updateExpertise: (id: number, dataUpdate: Expertise) => {
          set(
            (state) => ({
              expertise: state.expertise.map((e) =>
                e.id == id ? dataUpdate : e
              ),
            }),
            false,
            { type: "updatePerson", id }
          );
        },
        removeExpertise: (id: number) =>
          set((state) => ({
            expertise: state.expertise.filter((e) => e.id != id),
          })),
        nextId: () => {
          const ids = get().expertise.map((a) => a.id);
          return ids.length ? Math.max(...ids) + 1 : 1;
        },
      }),
      {
        name: "person-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
