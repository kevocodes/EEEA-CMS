import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DEFAULT_REDIRECT } from "@/constants/routes";
import { ResponseError } from "@/models/responseError.model";
import { OtpSchema } from "@/schemas/otp.schema";
import { verifyEmail } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ShowCountDown from "./ShowCountDown";
import Countdown from "react-countdown";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

interface VerifyEmailFormProps {
  loading: boolean;
  expiresIn: string;
  resendLoading: boolean;
  canResend: boolean;
  setCanResend: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  handleResend: () => Promise<void>;
}

function VerifyEmailForm({
  loading,
  setError,
  expiresIn,
  resendLoading,
  canResend,
  setCanResend,
  handleResend,
}: VerifyEmailFormProps) {
  const navigate = useNavigate();

  const token = useAuth((state) => state.token);
  const logout = useAuth((state) => state.logout);
  const updateVerificationStatus = useAuth(
    (state) => state.updateVerificationStatus
  );

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OtpSchema>) {
    try {
      const message = await verifyEmail(data.pin, token!);
      toast.success(message);
      updateVerificationStatus(true);
      navigate(DEFAULT_REDIRECT);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      setError("Error al verificar el correo");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-fit sm:w-full max-w-[300px] sm:max-w-sm flex flex-col gap-2"
      >
        {loading && (
          <div className="w-full flex justify-center items-center text-primary flex-col gap-2">
            <Loader2 size={160} className="animate-spin" />
          </div>
        )}

        {!loading && (
          <div className="flex flex-col justify-center items-center">
            <img src="/logo.webp" alt="Logo" className="w-20 h-20" />
          </div>
        )}

        {!loading && (
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

        {!loading && (
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

        {!loading && canResend && (
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
  );
}

export default VerifyEmailForm;
