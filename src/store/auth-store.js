import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      authenticated: false,
      profilePic: '',
      fullName: '',
      clientEmail: '',
      toggleAuthState: (value) => set({ authenticated: value }),
      setProfilePic: (value) => set({ profilePic: value }),
      setFullName: (value) => set({ fullName: value }),
      setClientEmail: (value) => set({ clientEmail: value }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
