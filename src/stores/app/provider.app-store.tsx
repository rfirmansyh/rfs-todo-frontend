'use client';

import {
  createContext, type ReactNode, useContext, useEffect, useRef 
} from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  createAppStore,
  initAppStore,
  type TAppStore,
} from '@/stores/app/store.app-store';

export const AppStoreContext = createContext<StoreApi<TAppStore> | null>(null);

export type TAppStoreProviderProps = {
  children: ReactNode;
};

export const AppStoreProvider = ({ children }: TAppStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TAppStore>>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
      storeRef.current?.setState((store) => ({
        ...store,
        isLoading: false
      }));
    }
  }, []);

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T, >(
  selector: (store: TAppStore) => T,
): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error('useAppStore must be use within AppStoreProvider');
  }

  return useStore(appStoreContext, selector);
};