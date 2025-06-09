import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username cannot be longer than 50 characters")
    .trim() // removes whitespace from start/end
    .regex(
      /^[^\x00-\x1F\x7F]*$/, // blocks control characters
      "Username contains invalid characters",
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  displayName: z.string().min(1, "Display name is required"),
});
