import { create } from 'zustand';
import { supabase } from '../config/supabase';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true until initAuth() completes — prevents ProtectedRoute from redirecting on refresh

  initAuth: async () => {
    set({ isLoading: true });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profile) {
        set({
          user: {
            id: profile.id,
            email: profile.email,
            username: profile.username,
            createdAt: profile.created_at,
          },
          isAuthenticated: true,
        });
      }
    }
    set({ isLoading: false });

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Defer the profile fetch to avoid deadlocking the Supabase client.
        // Making Supabase calls inside onAuthStateChange blocks auth from settling.
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profile) {
            set({
              user: {
                id: profile.id,
                email: profile.email,
                username: profile.username,
                createdAt: profile.created_at,
              },
              isAuthenticated: true,
            });
          }
        }, 0);
      } else if (event === 'PASSWORD_RECOVERY' && session?.user) {
        // User clicked the reset link in their email — mark as authenticated
        // so the ResetPassword page can call updateUser
        set({ user: null, isAuthenticated: true });
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, isAuthenticated: false });
      }
    });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email: string, username: string, password: string) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      if (error) throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
