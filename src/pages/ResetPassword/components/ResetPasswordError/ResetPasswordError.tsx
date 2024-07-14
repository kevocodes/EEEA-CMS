import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ResetPasswordError() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm flex justify-center items-center text-primary flex-col gap-2">
      <XCircle size={160} />
      <p className="text-sm text-muted-foreground text-balance text-center">
        Ha ocurrido un error al verificar el token de recuperación de
        contraseña, intentelo nuevamente más tarde.
      </p>
      <Button
        className="mt-4 w-full"
        onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
      >
        Aceptar
      </Button>
    </div>
  );
}

export default ResetPasswordError;
