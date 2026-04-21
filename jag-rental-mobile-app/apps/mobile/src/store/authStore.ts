import { create } from 'zustand';

type AuthState = {
  token?: string;
  isLoggedIn: boolean;
  setSession: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  isLoggedIn: false,
  setSession: (token) => set({ token, isLoggedIn: true }),
  logout: () => set({ token: undefined, isLoggedIn: false }),
}));
