export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  errors?: {
    password?: string[];
    token?: string[];
  };
}

export interface ForgotPasswordFetcherProps {
  email: string;
}
export interface ResetPasswordFetcherProps {
  newPassword: string;
  token: string;
}
