import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type TASidebarItemLink = {
  icon: any;
  labelKey: string;
  href: string;
}
export type TASidebarItemMenu = {
  icon: any;
  labelKey: string;
  href: string;
  submenus: Array<TASidebarItemLink>;
}

export type TRes<T = any> = {
  success: boolean;
  message: string;
  data: T;
}
export type TASidebarItem = {
  labelGroupKey: string;
  menus: Array<TASidebarItemMenu>
};

export type TQueryParams<T = any> = {
  key?: QueryKey;
  deps?: Array<any> | any;
  fnParams?: T;
  options?: UseQueryOptions<any, any, any, QueryKey>;
}