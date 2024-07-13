import { DEFAULT_REDIRECT, PUBLIC_ROUTES } from "@/constants/routes";
import { useAuth } from "@/stores/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireUnverifiedUser() {
  const location = useLocation();
  const user = useAuth((state) => state.user);

  if (!user) {
    return (
      <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  if (user.emailVerified) {
    return <Navigate to={DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}

export default RequireUnverifiedUser;
