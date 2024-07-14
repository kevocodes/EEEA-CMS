import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ResponseError } from "@/models/responseError.model";
import { sendEmailVerification, verifyEmail } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailWarning } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Countdown from "react-countdown";
import dayjs from "dayjs";
import ShowCountDown from "./components/ShowCountDown";
import { OtpSchema } from "@/schemas/otp.schema";
import { useNavigate } from "react-router-dom";
import { DEFAULT_REDIRECT } from "@/constants/routes";

function VerifyEmail() {
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const navigate = useNavigate();

  const isMounted = useRef(false);

  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState<string | null>("");

  const [expiresIn, setExpiresIn] = useState<string>("");
  const [canResend, setCanResend] = useState(false);

  const token = useAuth((state) => state.token);
  const logout = useAuth((state) => state.logout);
  const updateVerificationStatus = useAuth(
    (state) => state.updateVerificationStatus
  );

  async function onSubmit(data: z.infer<typeof OtpSchema>) {
    try {
      const message = await verifyEmail(data.pin, token!);
      toast.success(message);
      updateVerificationStatus(true);
      navigate(DEFAULT_REDIRECT);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      if (error instanceof Error) return setError(error.message);
      setError("Error al verificar el correo");
    }
  }

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
    <main className="min-h-[100dvh] w-full flex justify-center items-center flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit sm:w-full max-w-[300px] sm:max-w-sm flex flex-col gap-2"
        >
          {!loading && (
            <div className="flex flex-col justify-center items-center">
              <img src="/logo.webp" alt="Logo" className="w-20 h-20" />
            </div> 
          )}

          {!loading && !error && (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-xl text-center text-balance">
                    Verificación de correo electrónico
                  </FormLabel>
                  <FormDescription className="text-balance text-center">
                    Por favor ingresa el código de verificación enviado a tu
                    cuenta de correo electrónico.{" "}
                    {expiresIn && !resendLoading && (
                      <Countdown
                        date={dayjs(expiresIn).toDate()}
                        renderer={ShowCountDown}
                        onComplete={() => setCanResend(true)}
                      />
                    )}
                  </FormDescription>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                        <InputOTPSlot
                          index={3}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-12 w-12 sm:h-16 sm:w-16 text-xl"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {!loading && error && (
            <div className="w-full flex justify-center items-center text-primary flex-col gap-2">
              <MailWarning size={160} />
              <p className="text-sm text-muted-foreground text-balance text-center">
                Ha ocurrido un error al verificar el correo electrónico,
                intentelo nuevamente más tarde.
              </p>
            </div>
          )}

          {loading && (
            <div className="w-full flex justify-center items-center text-primary flex-col gap-2">
              <Loader2 size={160} className="animate-spin" />
            </div>
          )}

          {!loading && !error && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || resendLoading}
            >
              {form.formState.isSubmitting && (
                <Loader2 size={16} className="mr-2 animate-spin" />
              )}
              Verificar
            </Button>
          )}

          {!loading && !error && canResend && (
            <Button
              type="button"
              variant={"outline"}
              onClick={handleResend}
              disabled={form.formState.isSubmitting || resendLoading}
            >
              {resendLoading && (
                <Loader2 size={16} className="mr-2 animate-spin" />
              )}
              Reenviar código
            </Button>
          )}

          <Button type="button" variant={"outline"} onClick={() => logout()}>
            Cancelar
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default VerifyEmail;
