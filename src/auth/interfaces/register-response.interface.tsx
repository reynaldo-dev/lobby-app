export interface IRegisterResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  isActive: boolean;
  role: string;
  credits: number;
}
