export interface Authentication {
  access_token: string | null;
  isAuth: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  picture?: null;
  name: string;
  role: string;
  isActive: boolean;
  lastname: string;
  city?: string;
  department?: string;
  phone?: string;
  leagueId?: string;
  rol?: Rol;
}

interface Rol {
  role: string;
}
