export type ForbiddenErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | any;
}
