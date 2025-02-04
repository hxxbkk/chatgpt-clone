'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  model: string;
};

type Action = {
  updateModel: (model: string) => void;
};

// Zustand store
export const useModelStore = create<State & Action>()(
  persist(
    (set) => ({
      model: 'gpt-3.5-turbo',
      updateModel: (model) => set({ model }),
    }),
    {
      name: 'model-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Hydration 문제 방지
    }
  )
);
