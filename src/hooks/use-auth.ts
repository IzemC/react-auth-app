import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signIn, signUp } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
} from "../types/auth.types";

export const useSignIn = (): UseMutationResult<
  AuthResponse,
  unknown,
  SignInCredentials
> => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const data = await signIn(credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      console.error("Sign-in failed", error);
    },
  });
};

export const useSignUp = (): UseMutationResult<
  AuthResponse,
  unknown,
  SignUpCredentials
> => {
  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const data = await signUp(credentials);
      return data;
    },
    onError: (error) => {
      console.error("Sign-up failed", error);
    },
  });
};
