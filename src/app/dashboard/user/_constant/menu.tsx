import { get } from 'lodash';
import {
  FilePlus2, Gauge, LayoutList, ListTodo, 
  Settings2, 
  UsersRound
} from 'lucide-react';
import { APP_ROUTES } from '@/constants/routes.constant';
import type { TSidebarItem } from '@/types/app/common.type';

const BASE_KEY = 'dashboard.user';

const getRoute = (key: string) => get(APP_ROUTES, `${BASE_KEY}.${key}`, '#');
const getKey = (key: string) => `${BASE_KEY}.${key}`;

export const USER_MENU: Array<TSidebarItem> = [
  { 
    labelGroupKey: '',
    menus: [
      {
        icon: Gauge,
        labelKey: getKey('page'),
        href: getRoute('page'),
        submenus: []
      }
    ]
  },
  { 
    labelGroupKey: 'common.content',
    menus: [
      {
        icon: ListTodo,
        labelKey: getKey('todos.page'),
        href: '',
        submenus: [
          { icon: LayoutList, labelKey: getKey('todos.all.page'), href: getRoute('todos.all.page') },
          { icon: FilePlus2, labelKey: getKey('todos.create.page'), href: getRoute('todos.create.page') },
        ]
      }
    ]
  },
  { 
    labelGroupKey: 'common.setting',
    menus: [
      {
        icon: UsersRound,
        labelKey: getKey('setting.users.page'),
        href: getRoute('setting.users.page'),
        submenus: []
      },
      {
        icon: Settings2,
        labelKey: getKey('setting.account.page'),
        href: getRoute('setting.account.page'),
        submenus: []
      },
    ]
  },
];