import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SessionState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    try {
      await axios.post('/api/login', { email, password }, { withCredentials: true });
      const res = await axios.get('/api/session', { withCredentials: true });
      set({ user: res.data.user });
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  },

  signup: async (email, password) => {
    try {
      await axios.post('/api/signup', { email, password }, { withCredentials: true });
      const res = await axios.get('/api/session', { withCredentials: true });
      set({ user: res.data.user });
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  },

  logout: async () => {
    set({ user: null });
  },
}));
