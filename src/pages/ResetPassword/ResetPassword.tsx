import { useParams } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm";
import { useEffect, useRef, useState } from "react";
import { verifyForgotPasswordToken } from "@/services/auth.service";
import ResetPasswordError from "./components/ResetPasswordError/ResetPasswordError";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";
import { PUBLIC_ROUTES } from "@/constants/routes";

function ResetPassword() {
  useTitle(getTitles(PUBLIC_ROUTES.RESET_PASSWORD));

  const hasRendered = useRef(false);

  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        setLoading(true);
        await verifyForgotPasswordToken(token!);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (!hasRendered.current) {
      hasRendered.current = true;
      verifyToken();
    }
  }, [token]);

  return (
    <main className="min-h-[100dvh] w-full flex justify-center items-center flex-col p-2">
      {token && !error && <ResetPasswordForm token={token} loading={loading} />}
      {!loading && error && <ResetPasswordError />}
    </main>
  );
}

export default ResetPassword;
