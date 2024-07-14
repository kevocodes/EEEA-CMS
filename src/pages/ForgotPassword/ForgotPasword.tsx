import { useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";

function ForgotPasword() {
  const navigate = useNavigate();

  const [sendEmail, setUsendEmail] = useState(false);

  return (
    <main className="min-h-[100dvh] w-full flex justify-center items-center flex-col p-2">
      {!sendEmail && <ForgotPasswordForm setSendEmail={setUsendEmail} />}
      {sendEmail && (
        <div className="w-full max-w-sm flex justify-center items-center text-primary flex-col gap-2">
          <CheckCircle size={160} />
          <p className="text-xl font-bold text-center">
            Correo de recuperación enviado
          </p>
          <p className="text-sm text-muted-foreground text-balance text-center">
            Revisa tu bandeja de entrada para recuperar tu contraseña siguiendo
            los pasos indicados.
          </p>

          <Button onClick={() => navigate(PUBLIC_ROUTES.LOGIN)} className="mt-4">
            Continuar
          </Button>
        </div>
      )}
    </main>
  );
}

export default ForgotPasword;
