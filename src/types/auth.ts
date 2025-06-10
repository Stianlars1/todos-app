export interface AuthUserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string | null;
  locale?: string | null;
}

export type AuthUser = AuthUserDTO & {};
export type UserDTO = AuthUserDTO & {};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDTO;
}
