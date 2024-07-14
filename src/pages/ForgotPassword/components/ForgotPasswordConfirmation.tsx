import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm flex justify-center items-center text-primary flex-col gap-2">
      <CheckCircle size={160} />
      <p className="text-xl font-bold text-center">
        Correo de recuperación enviado
      </p>
      <p className="text-sm text-muted-foreground text-balance text-center">
        Revisa tu bandeja de entrada para recuperar tu contraseña siguiendo los
        pasos indicados.
      </p>

      <Button
        onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
        className="mt-4 w-full"
      >
        Aceptar
      </Button>
    </div>
  );
}

export default ForgotPasswordConfirmation;
