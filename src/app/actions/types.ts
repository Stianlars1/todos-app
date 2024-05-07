import { LanguageType } from "./user/types";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface SignUpCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface signupResponseDTO {
  success: boolean;
  message: string;
  data: any | null;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface DecryptedToken {
  sub: string;
  iat: number;
  exp: number;
  email: string;
  userId: number;
  firstName: string;
  lastName: string;
  locale: LanguageType;
}

export type SessionType = DecryptedToken;

export interface authResponseDTO {
  data: Tokens;
  message: string;
  success: boolean;
}
export interface TokenType {
  accessToken: string;
  refreshToken: string;
}
