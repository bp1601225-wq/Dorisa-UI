import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "token";
const USER_KEY = "dorisa-auth-current-user";
const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL: API_URL,
});

const clearAuthStorage = () => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error("[api] Failed to clear auth storage:", err);
  }
};

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isBrowser) return Promise.reject(error);

    const status = error?.response?.status;
    const url = String(error?.config?.url || "");
    const hasToken = !!localStorage.getItem(TOKEN_KEY);

    // If the backend says our token is no longer valid, force logout.
    // Skip /auth (bad credentials can also be 401).
    if (hasToken && (status === 401 || status === 403) && !url.includes("/auth")) {
      console.warn("[api] Unauthorized response; clearing auth and redirecting", {
        status,
        url,
      });

      clearAuthStorage();

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
