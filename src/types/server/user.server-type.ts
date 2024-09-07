export type TSUserRole = 'user' | 'admin';

export type TSUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: TSUserRole;
  created_at: Date;
  updated_at: Date;
}
export type TSUserToken = {
  expiresIn: number;
  accessToken: string;
}
export type TSUserLoginResult = {
  user: TSUser;
  token: TSUserToken;
}