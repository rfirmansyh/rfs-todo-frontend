import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/button';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/atoms/tooltip';
import { cn } from '@/libs/utils/style.util-lib';
import type { TASidebarItemLink } from '@/types/app/common.type';

type TSidebarItemLinkProps = {
  open?: boolean;
} & TASidebarItemLink

const SidebarItemLink = ({
  open,
  icon: Icon,
  labelKey,
  href
}: TSidebarItemLinkProps) => {
  const t = useTranslations('routes');

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            key={labelKey}
            className="mb-2 h-10 w-full justify-start"
            asChild
          >
            <Link href={href}>
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  'max-w-[170px] truncate',
                  open
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-96 opacity-0'
                )}
              >
                {t(labelKey)}
              </p>
            </Link>
          </Button>
        </TooltipTrigger>
        {!open ? (
          <TooltipContent side="right">
            {t(labelKey)}
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItemLink;