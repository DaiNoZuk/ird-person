import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type SearchState = {
  searchQuery: string;
  searchHistory: string[];
};

type SearchActions = {
  setSearch: (q: string) => void;
  addSearchHistory: (q: string) => void;
  clearSearchHistory: () => void;
};

type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>()(
  devtools(
    persist(
      (set, get) => ({
        searchQuery: "",
        searchHistory: [],

        setSearch: (q) => set({ searchQuery: q }),

        addSearchHistory: (q) => {
          const v = q.trim();
          if (!v) return;
          const next = [v, ...get().searchHistory.filter((h) => h !== v)].slice(0, 10);
          set({ searchHistory: next });
        },

        clearSearchHistory: () => set({ searchHistory: [] }),
      }),
      {
        name: "search-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({ searchHistory: s.searchHistory }), // ไม่ต้อง persist query ปัจจุบันก็ได้
      }
    )
  )
);
