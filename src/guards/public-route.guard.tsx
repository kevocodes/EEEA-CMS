import { DEFAULT_REDIRECT } from "@/constants/routes";
import { useAuth } from "@/stores/auth.store";
import { Navigate, Outlet } from "react-router-dom";

function PublicGuard() {
  const user = useAuth((state) => state.user);
  
  if (user) {
    return <Navigate to={DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}

export default PublicGuard;
