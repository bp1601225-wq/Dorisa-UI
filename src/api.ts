import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "token";
const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (!isBrowser) {
      return config;
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      if (!config.headers) {
        config.headers = {} as any;
      }
      config.headers.Authorization = `Bearer ${token}`;
      console.debug("[api] Attaching token to request", config.url);
    } else {
      console.debug("[api] No token available for", config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
