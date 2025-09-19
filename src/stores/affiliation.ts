import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import afiliationMock from "../data/mock_affiliations.json";
import type { Affiliation } from "../types";

interface AffiliationStore {
  affiliation: Affiliation[];
  addAffiliation: (p: Affiliation) => void;
  updateAffiliation: (id: number, dataUpdate: Affiliation) => void;
  removeAffiliation: (id: number) => void;
  nextId: () => number;
}

export const useAffiliationStore = create<AffiliationStore>()(
  devtools(
    persist(
      (set, get) => ({
        affiliation: afiliationMock,
        addAffiliation: (newAffiliation: Affiliation) =>
          set((state) => ({
            affiliation: [...state.affiliation, newAffiliation],
          })),
        updateAffiliation: (id: number, dataUpdate: Affiliation) => {
          set(
            (state) => ({
              affiliation: state.affiliation.map((p) =>
                p.id == id ? dataUpdate : p
              ),
            }),
            false,
            { type: "updatePerson", id }
          );
        },
        removeAffiliation: (id: number) =>
          set((state) => ({
            affiliation: state.affiliation.filter((e) => e.id != id),
          })),
        nextId: () => {
          const ids = get().affiliation.map((a) => a.id);
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
