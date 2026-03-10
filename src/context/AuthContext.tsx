import { createContext, useContext, useState,  type ReactNode } from "react";
import { type UserType, type AuthContextTypes } from "../../GlobalTypes";
import axios from "axios";
import { toast } from "sonner";


const API_URL = import.meta.env.VITE_API_URL

export const AuthenticationContext = createContext<AuthContextTypes | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Login function
  const Login = async (data: {}): Promise<UserType | null> => {
    try {
      const response = await axios.post(`${API_URL}/auth`, data);
      setCurrentUser(response.data);
      toast.success(`Welcome back ${response.data.user.email}`);
      console.log("Login response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        toast.error(error.response.data.message || "Login failed");
      } else {
        console.error("Axios error:", error.message);
        toast.error(error.message);
      }
      return null;
    }
  };
  // Logout function
  const Logout = () => {
    setCurrentUser(null);
  }

  return (
    <AuthenticationContext.Provider value={{ Login, Logout, currentUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
