import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLoadingScreen from "../../components/AuthLoadingScreen";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { currentUser, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <AuthLoadingScreen />;
  }

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (
    allowedRoles &&
    currentUser.role &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
