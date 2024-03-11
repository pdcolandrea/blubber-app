import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './zustand-persist';

const generateFakeData = () => {
  const entries = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    entries.push({
      date,

      weight: Math.floor(Math.random() * 100) + 200,
      satisfaction: ['happy', 'neutral', 'sad'][Math.floor(Math.random() * 3)],
      note: 'This is a note',
      image: 'https://via.placeholder.com/150',
    });
  }
  return entries;
};

interface WeightEntry {
  date: Date;
  weight: number;
  satisfaction?: 'happy' | 'neutral' | 'sad';
  note?: string;
  image?: string;
}

type WeightUnit = 'lb' | 'kg';

interface WeightState {
  entries: WeightEntry[];
  addEntry: (entry: WeightEntry) => void;
  lastEntry: () => WeightEntry | undefined;
  setUnit: (unit: WeightUnit) => void;
  unit: WeightUnit;
  debugAdd: () => void;
  goal?: {
    weight: number;
    date: Date;
  };
}

export const useWeightHistory = create<WeightState>()(
  persist(
    (set, get) => ({
      entries: [],
      unit: 'lb',
      addEntry: (entry) => set((state) => ({ entries: state.entries.concat(entry) })),
      lastEntry: () => {
        const entries = get().entries;
        return entries.sort((a, b) => b.date - a.date)[0];
      },
      setUnit: (unit) => set({ unit }),
      debugAdd: () =>
        set((state) => {
          const entries = generateFakeData();
          return { entries: entries };
        }),
    }),
    { name: 'weight-history', storage: createJSONStorage(() => zustandStorage) }
  )
);
