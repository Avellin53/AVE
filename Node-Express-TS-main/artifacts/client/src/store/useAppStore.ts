import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

interface AppState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  emailSubscribed: boolean;
  setEmailSubscribed: (subscribed: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;

  session: Session | null;
  setSession: (session: Session | null) => void;

  userRole: 'BUYER' | 'VENDOR' | null;
  setUserRole: (role: 'BUYER' | 'VENDOR' | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

  emailSubscribed: false,
  setEmailSubscribed: (subscribed) => set({ emailSubscribed: subscribed }),

  user: null,
  setUser: (user) => set({ user }),

  session: null,
  setSession: (session) => set({ session }),

  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
}));
