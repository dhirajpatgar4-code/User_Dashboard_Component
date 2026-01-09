// apiClient.js
import axios from 'axios';
// import apiPublic from "./apiPublic";
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth-store';
// import { getDecryptedToken } from "../utils/cryptoUtil";

axios.defaults.withCredentials = true;
const token = useAuthStore.getState().secureToken;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      toast.info('Session expired, logging out...');
      // Clear local user state
      localStorage.clear();
      // Redirect to login
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export default api;
