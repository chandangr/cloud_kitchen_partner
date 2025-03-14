import { supabase } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userRes = supabase.auth?.storage?.getItem("user");
  const userDetails = JSON.parse(userRes);

  // Check if the session exists
  if (!userDetails?.id) {
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
