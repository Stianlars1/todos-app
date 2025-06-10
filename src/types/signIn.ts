// Base server action response type
import { AuthUserDTO } from "@/types/auth";

export interface ServerActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: {
    type: "validation" | "authentication" | "server" | "network";
    message: string;
    fields?: Record<string, string[]>;
  };
}

// Specific type for authentication responses
export interface AuthActionResponse extends ServerActionResponse<AuthUserDTO> {
  redirectTo?: string;
}
