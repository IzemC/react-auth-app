import { apiFetcher } from "../utils/fetcher";
import {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
} from "../types/auth.types";

export const signIn = async (
  credentials: SignInCredentials
): Promise<AuthResponse> => {
  return apiFetcher("https://api.example.com/auth/signin", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const signUp = async (
  credentials: SignUpCredentials
): Promise<AuthResponse> => {
  return apiFetcher("https://api.example.com/auth/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
