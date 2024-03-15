import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './zustand-persist';

interface UserState {
  heightIn: number;
  setupUser: (heightIn: number, weightLb: number) => void;
}

export const useUserSettings = create<UserState>()(
  persist(
    (set, get) => ({
      heightIn: 0,
      setupUser: (heightIn, weightLb) => set({ heightIn }),
    }),
    { name: 'user-store', storage: createJSONStorage(() => zustandStorage) }
  )
);
