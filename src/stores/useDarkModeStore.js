import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDarkModeStore = create(
  persist(
    (set) => ({
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'dark-mode-storage',
    }
  )
);

export default useDarkModeStore;
