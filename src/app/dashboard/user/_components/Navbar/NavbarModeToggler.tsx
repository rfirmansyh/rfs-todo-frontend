import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MoonStar, SunIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/atoms/tooltip';

const NavbarModeToggler = () => {
  const t = useTranslations();
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="size-8 rounded-full bg-background"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="size-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
            <MoonStar className="absolute size-[1.2rem] rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">{ t('common.switchTheme') }</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{ t('common.switchTheme') }</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavbarModeToggler;