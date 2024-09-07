'use client';

import Link from 'next/link';
import { PanelsTopLeft } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { cn } from '@/libs/utils/style.util-lib';
import { useDashboardStore } from '../../_stores/dashboard.provider';
import SidebarMenu from './SidebarMenu';
import { SidebarToggle } from './SidebarToggler';

const Sidebar = () => {
  // STORE
  const { openSidebar, toggleSidebar } = useDashboardStore((store) => store);

  

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        openSidebar ? 'w-72' : 'w-[90px]' 
      )}
    >
      <SidebarToggle open={openSidebar} onClick={toggleSidebar} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            openSidebar ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="size-6" />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                openSidebar === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <SidebarMenu open={openSidebar} />
      </div>
    </aside>
  );
};

export default Sidebar;
