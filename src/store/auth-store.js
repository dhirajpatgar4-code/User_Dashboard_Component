import { Languages } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      authenticated: false,
      profilePic: '',
      fullName: '',
      clientEmail: '',
      clientPhone: '',
      authType: '',
      secureToken: '',
      toggleAuthState: (value) => set({ authenticated: value }),
      setProfilePic: (value) => set({ profilePic: value }),
      setFullName: (value) => set({ fullName: value }),
      setDob: (value) => set({dob : value}),
      setGender : (value) => set({gender : value}),
      setLanguage : (value) => set({preferred_language : value}),
      setTimeZone : (value) => set({timezone : value}),
      setClientEmail: (value) => set({ clientEmail: value }),
      setClientPhone: (value) => set({ clientPhone: value }),
      setAuthType: (value) => set({ authType: value }),
      setSecureToken: (value) => set({ secureToken: value }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
