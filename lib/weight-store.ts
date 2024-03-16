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
      images: 'https://via.placeholder.com/150',
    });
  }
  return entries;
};

interface WeightEntry {
  date: Date;
  weight: number;
  satisfaction?: 'happy' | 'neutral' | 'sad';
  note?: string;
  images?: string[];
}

type WeightUnit = 'lb' | 'kg';

interface WeightState {
  entries: WeightEntry[];
  addEntry: (entry: WeightEntry) => void;
  lastEntry: () => WeightEntry | undefined;
  deleteAllEntries: () => void;
  setUnit: (unit: WeightUnit) => void;
  unit: WeightUnit;
  getStreak: () => number;
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
      getStreak: () => {
        const entries = get().entries;

        const streak = entries.reduce((acc, entry, index) => {
          const prevEntry = entries[index - 1];
          if (prevEntry) {
            const prevDate = new Date(prevEntry.date);
            prevDate.setDate(prevDate.getDate() + 1);
            const entryDate = new Date(entry.date); // ensure entry.date is a Date object
            if (entryDate.getTime() === prevDate.getTime()) {
              return acc + 1;
            }
          }
          return acc;
        }, 0);
        return streak;
      },
      deleteAllEntries: () => set({ entries: [] }),
      setUnit: (unit) => set({ unit }),
      debugAdd: () =>
        set((state) => {
          const entries = generateFakeData();
          return { entries };
        }),
    }),
    { name: 'weight-history', storage: createJSONStorage(() => zustandStorage) }
  )
);
