'use client';

import { useCallback, useMemo } from 'react';
import {
  useParams, usePathname, useRouter 
} from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { logout } from '@/libs/api/auth/auth-fetcher.api-lib';
import { useMe } from '@/libs/api/auth/auth-query.api-lib';
import { getLocaleFormatViaPathName } from '@/libs/utils/app.util-lib';
import NavbarLocaleToggler from './NavbarLocaleToggler';
import NavbarModeToggler from './NavbarModeToggler';
import NavbarProfileToggler from './NavbarProfileToggler';

const Navbar = () => {
  // HOOKS
  const t = useTranslations('routes');
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();

  // DATA
  const { data: dataMe, refetch: refetchMe } = useMe();

  // COMPUTED
  const renderTitle = useMemo(() => t(getLocaleFormatViaPathName(pathName, params)), [t, params, pathName]);

  // HANDLER
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      await refetchMe();

      router.refresh();
      toast.success('Logout successfully !');
    } catch (err) {
      toast.error('Logout Failed !');
    }
  }, [router, refetchMe]);
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <h1 className="font-bold">{renderTitle}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NavbarModeToggler />
          <NavbarLocaleToggler />
          <NavbarProfileToggler user={dataMe?.data} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
