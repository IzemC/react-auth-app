// schemas/signup.schema.ts
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: "Passwords must match" };
    }
    return {};
  });
