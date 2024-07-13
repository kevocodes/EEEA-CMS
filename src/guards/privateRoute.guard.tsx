import {
  DEFAULT_REDIRECT,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/constants/routes";
import { Role } from "@/models/user.model";
import { useAuth } from "@/stores/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireAuthProps {
  allowedRoles: Role[];
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const user = useAuth((state) => state.user);

  if (!user) {
    return (
      <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  if (!user.emailVerified) {
    return <Navigate to={PRIVATE_ROUTES.VERIFY_EMAIL} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
