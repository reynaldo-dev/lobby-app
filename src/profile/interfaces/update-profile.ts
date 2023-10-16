import { departments } from "../../auth/screens/register/Register";
export interface UpdateProfileResponse {
  id: string;
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  createdAt: string;
  rolId: string;
  phone: string;
  department: string;
  city: string;
}

export interface UpdateProfilePayload {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  department: string;
  city: string;
}
