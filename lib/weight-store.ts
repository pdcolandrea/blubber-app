import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './zustand-persist';

interface WeightEntry {
  date: string;
  weight: number;
  note?: string;
  image?: string;
}

type WeightUnit = 'lb' | 'kg';

interface WeightState {
  entries: WeightEntry[];
  addEntry: (entry: WeightEntry) => void;
  setUnit: (unit: WeightUnit) => void;
  unit: WeightUnit;
}

export const useWeightHistory = create<WeightState>()(
  persist(
    (set) => ({
      entries: [],
      unit: 'lb',
      addEntry: (entry) => set((state) => ({ entries: state.entries.concat(entry) })),
      setUnit: (unit) => set({ unit }),
    }),
    { name: 'weight-history', storage: createJSONStorage(() => zustandStorage) }
  )
);
