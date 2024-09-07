import {
  getCookie, removeCookie, setCookie 
} from 'typescript-cookie';
import {
  createJSONStorage, persist, type StateStorage 
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export type TAppState = {
  isLoading: boolean;
  locale: string;
};
export type TAppActions = {
  setIsLoading: (isLoading: TAppState['isLoading']) => void;
  setLocale: (locale: TAppState['locale']) => void;
};
export type TAppStore = TAppState & TAppActions;

export const initAppStore = (): TAppState => ({ locale: 'en', isLoading: true });

const cookiesStorage: StateStorage = {
  getItem: (name: string) => getCookie(name) ?? null,
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 1, path: '/' });
  },
  removeItem: (name: string) => {
    removeCookie(name);
  }
};

export const defaultInitState: TAppState = {
  isLoading: false,
  locale: 'en',
};
export const createAppStore = (initState: TAppState = defaultInitState) =>
  createStore<TAppStore>()(
    persist(
      immer((set) => ({
        ...initState,
        setLocale: (locale: TAppState['locale']) => set((state) => {
          state.locale = locale;
        }),
        setIsLoading: (isLoading: TAppState['isLoading']) => set((state) => {
          state.isLoading = isLoading;
        })
      })),
      { name: 'locale', storage: createJSONStorage(() => cookiesStorage) }
    ),
  );
