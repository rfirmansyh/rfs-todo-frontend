import { ScrollArea } from '@/components/atoms/scroll-area';
import { USER_MENU } from '../../_constant/menu';
import SidebarItem from './SidebarItem';

type TSidebarMenuProps = {
  open?: boolean;
}

const SidebarMenu = ({
  open
}: TSidebarMenuProps) => (
  <ScrollArea className="relative overflow-hidden [&>div>div[style]]:!block">
    <nav className="mt-8 size-full">
      <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
        {USER_MENU.map((item) => (
          <SidebarItem key={item.labelGroupKey} open={open} item={item} />
        ))}
      </ul>
    </nav>
  </ScrollArea>
);

export default SidebarMenu;