import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (authStatus: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  setAuth: (authStatus) => set({ isAuthenticated: authStatus }),
  login: (token: string) => {
    localStorage.setItem("authToken", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
