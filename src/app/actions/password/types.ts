export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordFetcherProps {
  email: string;
}
export interface ResetPasswordFetcherProps {
  newPassword: string;
  token: string;
}
