import { apiFetcher } from "../utils/fetcher";
import {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
} from "../types/auth.types";

export const signIn = async (
  credentials: SignInCredentials
): Promise<AuthResponse> => {
  return apiFetcher("/auth/signin", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const signUp = async (
  credentials: SignUpCredentials
): Promise<AuthResponse> => {
  return apiFetcher("/auth/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
