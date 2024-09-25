import { z } from "zod";
import { signUpSchema } from "../schemas/signup.schema";
import { signInSchema } from "../schemas/signin.schema";
import { ApiResponse } from "./response.types";

export type AuthResponse = ApiResponse<{
  access_token: string;
  email: string;
}>;

export type SignInCredentials = z.infer<typeof signInSchema>;

export type SignUpCredentials = z.infer<typeof signUpSchema>;
