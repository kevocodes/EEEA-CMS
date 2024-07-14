import { ResponseError } from "@/models/responseError.model";
import { sendEmailVerification } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import VerifyEmailForm from "./components/VerifyEmailForm";
import VerifyEmailError from "./components/VerifyEmailError";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";
import { PRIVATE_ROUTES } from "@/constants/routes";

function VerifyEmail() {
  useTitle(getTitles(PRIVATE_ROUTES.VERIFY_EMAIL));

  const isMounted = useRef(false);

  const token = useAuth((state) => state.token);

  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const [expiresIn, setExpiresIn] = useState<string>("");
  const [canResend, setCanResend] = useState(false);

  async function handleResend() {
    // Set loading to true
    setResendLoading(true);
    // fetch data again
    await fetchData();
    // Set loading to false
    setResendLoading(false);
    // Reset resend button
    setCanResend(false);
  }

  const fetchData = useCallback(async () => {
    try {
      const expiresAtResponse = await sendEmailVerification(token!);
      setExpiresIn(expiresAtResponse);
      toast.success("Correo de verificación enviado");
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.status === 409) {
          return setExpiresIn(error.message);
        }

        return setError(error.message);
      }
      if (error instanceof Error) return setError(error.message);
      setError("Error al verificar el correo");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, [fetchData]);

  return (
    <main className="min-h-[100dvh] w-full flex justify-center items-center flex-col p-2">
      {!error && (
        <VerifyEmailForm
          loading={loading}
          setError={setError}
          expiresIn={expiresIn}
          resendLoading={resendLoading}
          canResend={canResend}
          setCanResend={setCanResend}
          handleResend={handleResend}
        />
      )}
      {!loading && error && <VerifyEmailError />}
    </main>
  );
}

export default VerifyEmail;
