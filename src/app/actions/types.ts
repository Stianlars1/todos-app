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
  username: string;
  email: string;
  userId: number;
}

export interface authResponseDTO {
  data: Tokens;
  message: string;
  success: boolean;
}
