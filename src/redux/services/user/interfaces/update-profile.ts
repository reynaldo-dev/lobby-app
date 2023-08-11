export interface UpdateProfileResponse {
  id: string;
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  createdAt: string;
  rolId: string;
}

export interface UpdateProfilePayload {
  id: string;
  name: string;
  lastname: string;
  email: string;
}
