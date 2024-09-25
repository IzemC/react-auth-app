import { create } from "zustand";
import { AuthResponse } from "../types/auth.types";

interface AuthState {
  hasInitialize: boolean;
  email: string | null;
  access_token: string | null;
  isAuthenticated: boolean;
  initializeAuth: () => void;
  setAuth: (authStatus: boolean) => void;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  hasInitialize: false,
  email: null,
  access_token: null,
  isAuthenticated: false,
  initializeAuth: () => {
    const access_token = localStorage.getItem("access_token");
    const email = localStorage.getItem("email");
    if (access_token) {
      set({ access_token, email, isAuthenticated: true, hasInitialize: true });
    } else {
      set({
        access_token: null,
        email: null,
        isAuthenticated: false,
        hasInitialize: true,
      });
    }
  },
  setAuth: (authStatus) => set({ isAuthenticated: authStatus }),
  login: ({ data: { access_token, email } }: AuthResponse) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("email", email);
    set({ access_token, email, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    set({ access_token: null, email: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
