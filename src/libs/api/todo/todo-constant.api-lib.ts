export const TODO_API = {
  findAll: '/todo',
  findOne: (id: string) => `/todo/${id}`,
  create: '/todo',
  update: (id: string) => `/todo/${id}`,
  delete: (id: string) => `/todo/${id}`,
};