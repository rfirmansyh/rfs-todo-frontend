import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {ChevronDown, Dot} from 'lucide-react';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/atoms/button';
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger 
} from '@/components/atoms/collapsible';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/atoms/dropdown-menu';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/atoms/tooltip';
import type { TASidebarItemMenu } from '@/types/app/common.type';

type TSidebarItemMenuProps = {
  open?: boolean;
} & TASidebarItemMenu

const SidebarItemMenu = ({
  open: openSidebar,
  icon: Icon,
  labelKey,
  submenus
}: TSidebarItemMenuProps) => {
  const t = useTranslations('routes');

  const [open, setOpen] = useState(true);

  if (openSidebar) {
    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="mb-2 w-full"
      >
        <CollapsibleTrigger
          className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
          asChild
        >
          <Button
            variant="ghost"
            className="h-10 w-full justify-start"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon size={18} />
                </span>
                <p className="max-w-[150px] truncate">
                  {t(labelKey)}
                </p>
              </div>
              <div className="whitespace-nowrap">
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {submenus.map(({ labelKey, href }) => (
            <Button
              variant="ghost"
              key={labelKey}
              className="mb-1 h-10 w-full justify-start"
              asChild
            >
              <Link href={href}>
                <span className="ml-2 mr-4">
                  <Dot size={18} />
                </span>
                <p className="max-w-[170px] truncate">
                  {t(labelKey)}
                </p>
              </Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <div className="flex w-full items-center justify-between">
                  <span>
                    <Icon size={18} />
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            {t(labelKey)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {t(labelKey)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, labelKey }) => (
          <DropdownMenuItem key={labelKey} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{t(labelKey)}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarItemMenu;