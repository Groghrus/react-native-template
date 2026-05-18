import { create } from 'zustand';
import { storage } from '@shared/lib/storage';
import type { User } from './types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    storage.delete('accessToken');
    storage.delete('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
}));

export { useUserStore };
