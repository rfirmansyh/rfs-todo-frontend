import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { cn } from '@/libs/utils/style.util-lib';

type TSidebarToggleProps = {
  open: boolean;
  onClick: () => void;
}
export function SidebarToggle({ open, onClick }: TSidebarToggleProps) {
  return (
    <div className="invisible absolute right-[-16px] top-[12px] z-20 lg:visible">
      <Button
        onClick={onClick}
        className="size-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform ease-in-out duration-700',
            open === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
    </div>
  );
}