'use client';

import {
  createContext, type ReactNode, useContext, useRef 
} from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  createDashboardStore,
  initDashboardStore,
  type TDashboardStore,
} from './dashboard.store';

export const DashboardStoreContext =
  createContext<StoreApi<TDashboardStore> | null>(null);

export type TDashboardStoreProviderProps = {
  children: ReactNode;
};

export const DashboardStoreProvider = ({
  children,
}: TDashboardStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TDashboardStore>>();
  if (!storeRef.current) {
    storeRef.current = createDashboardStore(initDashboardStore());
  }

  return (
    <DashboardStoreContext.Provider value={storeRef.current}>
      {children}
    </DashboardStoreContext.Provider>
  );
};

export const useDashboardStore = <T, >(
  selector: (store: TDashboardStore) => T,
): T => {
  const dashboardStoreContext = useContext(DashboardStoreContext);

  if (!dashboardStoreContext) {
    throw new Error(
      'useDashboardStore must be use within DashboardStoreProvider',
    );
  }

  return useStore(dashboardStoreContext, selector);
};
