import React from 'react';
import { useTranslations } from 'next-intl';
import { Ellipsis } from 'lucide-react';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/atoms/tooltip';

type TSidebarItemLabelGroup = {
  open?: boolean;
  labelGroupKey: string;
}
const SidebarItemLabelGroup = ({
  open,
  labelGroupKey,
}: TSidebarItemLabelGroup) => {
  const t = useTranslations();

  if (!labelGroupKey) {
    return null;
  }

  if (open) {
    return (
      <p className="mt-2 max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">{t(labelGroupKey)}</p>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className="mt-2 w-full">
          <div className="flex w-full items-center justify-center">
            <Ellipsis className="size-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>{t(labelGroupKey)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItemLabelGroup;