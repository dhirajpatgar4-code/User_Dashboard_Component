// apiClient.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth-store';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// 🔐 REQUEST INTERCEPTOR (IMPORTANT)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().secureToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔁 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional silent logout
      useAuthStore.getState().toggleAuthState(false);
      localStorage.clear();
    }
    return Promise.reject(error);
  },
);

export default api;
