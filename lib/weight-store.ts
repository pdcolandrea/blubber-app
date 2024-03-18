import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './zustand-persist';
import dayjs from 'dayjs';

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
  setGoal: (goal: { weight: number; date: Date }) => void;
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
      setGoal: (g) => {
        set({ goal: g });
      },
      getStreak: () => {
        const entries = get().entries.sort((a, b) => b.date - a.date); // sort entries in descending order

        let streak = 0;
        const now = new Date();

        for (let i = 0; i < entries.length; i++) {
          const entryDate = new Date(entries[i].date);
          const diffInDays = dayjs(now).diff(dayjs(entryDate), 'day');

          if (diffInDays === i) {
            streak++;
          } else {
            break;
          }
        }

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
