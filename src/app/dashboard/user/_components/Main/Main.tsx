'use client';

import React, { type ReactNode } from 'react';
import { cn } from '@/libs/utils/style.util-lib';
import { useDashboardStore } from '../../_stores/dashboard.provider';

type TMain = {
  children?: ReactNode
}
const Main = ({ children }: TMain) => {
  // STORE
  const { openSidebar } = useDashboardStore((store) => store);

  return (
    <main
      className={cn(
        'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
        openSidebar === false ? 'lg:ml-[90px]' : 'lg:ml-72'
      )}
    >
      {children}
    </main>
  );
};

export default Main;