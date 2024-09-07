import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export type TDashboard = {
  openSidebar: boolean;
};

export type TDashboardState = {
  openSidebar: TDashboard['openSidebar'];
};
export type TDashboardActions = {
  toggleSidebar: () => void;
};
export type TDashboardStore = TDashboardState & TDashboardActions;

export const initDashboardStore = (): TDashboardState => ({ openSidebar: true });

export const defaultInitState: TDashboardState = {
  openSidebar: true,
};
export const createDashboardStore = (
  initState: TDashboardState = defaultInitState,
) =>
  createStore<TDashboardStore>()(
    persist(
      immer((set) => ({
        ...initState,
        toggleSidebar: () =>
          set((state) => {
            state.openSidebar = !state.openSidebar;
          }),
      })),
      { name: 'toggleSidebar' },
    ),
  );
