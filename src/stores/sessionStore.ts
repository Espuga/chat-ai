import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  token: string;
  name: string;
}

interface SessionState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    const obj = { email, password };
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, obj);

    set({ user: res.data });

    Cookies.set('token', res.data.token, { expires: 7 });
  },

  register: async (name, email, password) => {
    const obj = { name, email, password };
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, obj);
    set({ user: res.data });

    Cookies.set('token', res.data.token, { expires: 1 });
  },

  logout: async () => {
    Cookies.remove('token');
    set({ user: null });
  },

  getUserInfo: async () => {
    const token = Cookies.get('token');
    if (!token) return;
    
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: res.data });
    } catch (err) {
      console.error('Failed to fetch user info:', err);
      // Cookies.remove('token');
      set({ user: null });
    }
  }
}));
