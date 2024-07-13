import { Toaster } from "@/components/ui/sonner";
import {
  DEFAULT_REDIRECT,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/constants/routes";
import RequireAuth from "@/guards/privateRoute.guard";
import NoRequireAuth from "@/guards/publicRoute.guard";
import AppLayout from "@/layouts/AppLayout";
import { Role } from "@/models/user.model";
import Events from "@/pages/Events/Events";
import Login from "@/pages/Login/Login";
import { validateSession } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { createAppUserFromResponseUser } from "@/utils/createAppUserFromResponseUser.util";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import EventCreate from "@/pages/EventCreate/EventCreate";
import EventEdit from "@/pages/EventEdit/EventEdit";
import Activities from "@/pages/Activities/Activities";
import ActivityCreate from "@/pages/ActivityCreate/ActivityCreate";
import ActivityEdit from "@/pages/ActivityEdit/ActivityEdit";
import Installations from "@/pages/Installations/Installations";
import InstallationCreate from "@/pages/InstallationCreate/InstallationCreate";
import InstallationEdit from "@/pages/InstallationEdit/InstallationEdit";
import Users from "@/pages/Users/Users";
import UserCreate from "@/pages/UsersCreate/UserCreate";
import UserEdit from "@/pages/UserEdit/UserEdit";
import Profile from "@/pages/Profile/Profile";
import VerfiyEmail from "@/pages/VerifyEmail/VerfiyEmail";
import RequireUnverifiedUser from "./guards/unverifiedUser.guard";

function App() {
  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    const validateUser = async (token: string) => {
      try {
        const userInfo = await validateSession(token);
        setUser(createAppUserFromResponseUser(userInfo));
      } catch (error) {
        logout();
      }
    };

    // Validate user session if token exists
    if (token) validateUser(token);
  }, [token, setUser, logout]);

  return (
    <>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<NoRequireAuth />}>
            <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<AppLayout />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[Role.ADMIN, Role.CONTENT_MANAGER]}
                />
              }
            >
              <Route index element={<Events />} />
              <Route path={PRIVATE_ROUTES.EVENTS} element={<Events />} />
              <Route
                path={PRIVATE_ROUTES.EVENTS_CREATE}
                element={<EventCreate />}
              />
              <Route
                path={`${PRIVATE_ROUTES.EVENTS_EDIT}/:eventId`}
                element={<EventEdit />}
              />
              <Route
                path={PRIVATE_ROUTES.ACTIVITIES}
                element={<Activities />}
              />
              <Route
                path={PRIVATE_ROUTES.ACTIVITIES_CREATE}
                element={<ActivityCreate />}
              />
              <Route
                path={`${PRIVATE_ROUTES.ACTIVITIES_EDIT}/:activityId`}
                element={<ActivityEdit />}
              />
              <Route
                path={PRIVATE_ROUTES.INSTALLATIONS}
                element={<Installations />}
              />
              <Route
                path={PRIVATE_ROUTES.INSTALLATIONS_CREATE}
                element={<InstallationCreate />}
              />
              <Route
                path={`${PRIVATE_ROUTES.INSTALLATIONS_EDIT}/:installationId`}
                element={<InstallationEdit />}
              />
              <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}>
              <Route path={PRIVATE_ROUTES.USERS} element={<Users />} />
              <Route
                path={PRIVATE_ROUTES.USERS_CREATE}
                element={<UserCreate />}
              />
              <Route
                path={`${PRIVATE_ROUTES.USERS_EDIT}/:userId`}
                element={<UserEdit />}
              />
            </Route>
          </Route>

          {/* VERIFICATIONS */}
          <Route element={<RequireUnverifiedUser />}>
            <Route
              path={PRIVATE_ROUTES.VERIFY_EMAIL}
              element={<VerfiyEmail />}
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to={DEFAULT_REDIRECT} />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
