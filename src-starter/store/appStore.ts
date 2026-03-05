import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  // UI state
  isDarkMode: boolean;
  sidebarOpen: boolean;
  notificationsEnabled: boolean;

  // Actions
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  setDarkMode: (isDark: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isDarkMode: false,
      sidebarOpen: true,
      notificationsEnabled: true,

      // Toggle actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      // Set actions
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        notificationsEnabled: state.notificationsEnabled,
      }),
    },
  ),
);
