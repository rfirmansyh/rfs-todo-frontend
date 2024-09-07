export const APP_ROUTES = {
  login: {
    page: '/login'
  },
  register: {
    page: '/register'
  },
  dashboard: {
    user: {
      page: '/dashboard/user/',
      todos: {
        all: { page: '/dashboard/user/todos' },
        create: { page: '/dashboard/user/todos/create' },
        show: (id: string) => ({ page: `/dashboard/user/todos/${id}` }),
        update: (id: string) => ({ page: `/dashboard/user/todos/${id}/update` }),
      },
      setting: {
        users: '/dashboard/setting/users',
        account: '/dashboard/setting/account',
      }
    },
    admin: {
      page: '/dashboard/admin/',
    }
  },
};

export const APP_PUBLIC_ROUTES: any = {
  '/login': true,
  '/register': true
};

