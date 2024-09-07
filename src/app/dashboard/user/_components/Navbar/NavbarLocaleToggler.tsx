
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GB, ID } from 'country-flag-icons/react/3x2';
import { Languages } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/atoms/dropdown-menu';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/atoms/tooltip';
import { useAppStore } from '@/stores/app/provider.app-store';

const NavbarLocaleToggler = () => {
  const t = useTranslations();
  const router = useRouter();
  const { setLocale } = useAppStore((store) => store);

  const handleClick = useCallback((locale: string) => {
    setLocale(locale);
    router.refresh();
  }, [router, setLocale]);

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className="size-8 rounded-full bg-background"
                variant="outline"
                size="icon"
              >
                <Languages className="size-[1.2rem]" />
                <span className="sr-only">{ t('common.switchLang') }</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">{ t('common.switchLang') }</TooltipContent>
        </Tooltip>
      </TooltipProvider>
  
      <DropdownMenuContent className="w-24" align="end" forceMount>
        <DropdownMenuItem className="flex items-center hover:cursor-pointer" onClick={() => handleClick('en')}>
          <GB className="mr-3 size-4 text-muted-foreground" />
          <span>{ t('locales.en') }</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center hover:cursor-pointer" onClick={() => handleClick('id')}>
          <ID className="mr-3 size-4 text-muted-foreground" />
          <span>{ t('locales.id') }</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarLocaleToggler;