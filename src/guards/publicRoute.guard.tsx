import { DEFAULT_REDIRECT } from "@/constants/routes";
import { useAuth } from "@/stores/auth.store";
import { Navigate, Outlet } from "react-router-dom";

interface PublicGuardProps {
  redirect?: string;
}

function PublicGuard({ redirect = DEFAULT_REDIRECT }: PublicGuardProps) {
  const user = useAuth((state) => state.user);

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}

export default PublicGuard;
