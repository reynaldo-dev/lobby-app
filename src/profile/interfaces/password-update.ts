export interface IPasswordUpdateResponse {
  success: boolean;
}

export interface IPasswordUpdatePayload {
  id: string;
  currentPassword: string;
  newPassword: string;
}
