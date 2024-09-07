import React from 'react';
import type { TASidebarItem } from '@/types/app/common.type';
import SidebarItemLabelGroup from './SidebarItemLabelGroup';
import SidebarItemLink from './SidebarItemLink';
import SidebarItemMenu from './SidebarItemMenu';

type TSidebarItemProps = {
  open?: boolean;
  item: TASidebarItem;
}
const SidebarItem = ({ open, item }: TSidebarItemProps) => (
  <>
    <SidebarItemLabelGroup open={open} labelGroupKey={item.labelGroupKey} />
    {item.menus.map((menu) => {
      if (menu.submenus.length > 0) {
        return <SidebarItemMenu key={menu.labelKey} open={open} {...menu}></SidebarItemMenu>;
      }
      if (menu.href !== '') {
        return <SidebarItemLink key={menu.labelKey} open={open} {...menu}></SidebarItemLink>;
      }

      return null;
    })}
  </>
);

export default SidebarItem;