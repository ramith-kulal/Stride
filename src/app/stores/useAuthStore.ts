import { create } from 'zustand';

type AuthState = {
  user: { name: string; email: string } | null;
  token: string | null;
  setUser: (user: { name: string; email: string }, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
