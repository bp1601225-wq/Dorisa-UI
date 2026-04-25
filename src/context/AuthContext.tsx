import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  type AuthContextTypes,
  type PublicUser,
  type UserType,
} from "../../GlobalTypes";
import api from "../api";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "dorisa-auth-current-user";
const isBrowser = typeof window !== "undefined";

/* ================= HELPERS ================= */

// Remove sensitive data
const sanitizeUser = (user: UserType | null): PublicUser | null => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest as PublicUser;
};

// LocalStorage read
const getStoredUser = (): PublicUser | null => {
  if (!isBrowser) return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as PublicUser) : null;
  } catch (err) {
    console.error("Storage parse error:", err);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

// LocalStorage write
const setStoredUser = (user: PublicUser | null) => {
  if (!isBrowser) return;

  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
};

export const getPersistedUser = getStoredUser;

/* ================= CONTEXT ================= */

export const AuthenticationContext = createContext<AuthContextTypes | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (!isBrowser) {
      setIsAuthReady(true);
      return;
    }

    const stored = getStoredUser();
    setCurrentUser(stored);
    setIsAuthReady(true);
  }, []);

  const persistUser = (user: PublicUser | null) => {
    setCurrentUser(user);
    setStoredUser(user);
  };




const Login = async (data: Record<string, unknown>) => {
  try {
    const res = await api.post(`/auth`, data);

    const { token, ...userData } = res.data;

    // ✅ store token
    localStorage.setItem("token", token);

    // ✅ sanitize user (even though it's already safe, keeps your pattern)
    const user = sanitizeUser(userData as UserType);

    if (!user) return null;

    persistUser(user);
    
    toast.success(`Welcome back ${user.email}`);

    return user;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err.message || "Login failed";

    toast.error(message);
    return null;
  }
};
  const Logout = () => persistUser(null);

  return (
    <AuthenticationContext.Provider
      value={{ Login, Logout, currentUser, isAuthReady }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const ctx = useContext(AuthenticationContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
