import { useAuthStore } from "../store/auth-store";
import { Navigate ,Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authenticated } = useAuthStore();

  // ❌ user not logged in
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ user logged in
  return <Outlet />;
};

export default ProtectedRoute;